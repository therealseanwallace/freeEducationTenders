/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import pkgSchedule from "node-schedule";
import getDateTimeString from "./helpers/getDateTimeString.js";
import getTenders from "./services/getTenders.js";

const runJobs = async () => {
  console.log(`${getDateTimeString()} - Running jobs...`);
  console.log(await getTenders());
}

const { scheduleJob, RecurrenceRule, Range } = pkgSchedule;

const rule = new RecurrenceRule();
rule.hour = new Range(0, 23, 1);

// const jobsSchedule = scheduleJob(rule, runJobs);

runJobs();