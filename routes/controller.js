const express = require('express')
const _ = require('lodash');
const criteria = require('../criteria');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const Userbrain = require('../models/Userbrain')
const Saw = require('../models/Saw')
const Story = require('../models/Story')


const Controller = {};

function getMinMax(value) {
	const penghasilanMin = _.minBy(value, 'penghasilan');
	const tanggunganMax = _.maxBy(value, 'tanggungan');
	const nilaiMax = _.maxBy(value, 'nilai');

	return {
		penghasilan: penghasilanMin.penghasilan,
		tanggungan: tanggunganMax.tanggungan,
		nilai: nilaiMax.nilai
	}
}

function normalisasi(matrix, maxmin) {
	matrix.penghasilan = maxmin.penghasilan / matrix.penghasilan;
	matrix.tanggungan = matrix.tanggungan / maxmin.tanggungan;
	matrix.nilai = matrix.nilai / maxmin.nilai;
	return matrix;
}

function hitungPeringkat(nilai) {
	const total = (nilai.penghasilan * criteria.penghasilan) + (nilai.tanggungan * criteria.tanggungan) + (nilai.nilai * criteria.nilai);
	
	const result = {
		nis: nilai.nis,
		nama: nilai.nama,
		sekolah: nilai.sekolah,
		judul: nilai.judul,
		penghasilan: nilai.penghasilan,
		tanggungan: nilai.tanggungan,
		nilai: nilai.nilai,
		total: total
	}
	
	return result;
	
}

Controller.getRecomendation = async (req, res) => {
	//const getNilaiBobot = await Userbrain.find({judul:"Beasiswa Amal"});
	const getNilaiBobot = await Userbrain.find({judul:"beasiswa amal"});
	//const getNilaiBobot = await Userbrain.find({judul:"beasiswa bandung"});
	const getMaxMin = getMinMax(getNilaiBobot);
	const normalisasiNilai = _.map(getNilaiBobot, nilai => normalisasi(nilai, getMaxMin));
	const hitungBobotPeringkat = _.map(normalisasiNilai, nilai => hitungPeringkat(nilai));
	const ranked = hitungBobotPeringkat.sort(function(a, b) 
		{ return parseFloat(b.total) - parseFloat(a.total); });
	res.render('seleksi', {
		ranked
	})
};

module.exports = Controller;