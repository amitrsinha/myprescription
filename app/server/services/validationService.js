const rules = require("../validationRules/rule");

const self = this;
let errors = [];
/**
 * 
 * @param {*} model
 * @description Validating model field agains defined rule set for each model 
 */
const validateModel = model => {
    const modelName = model.constructor.getTableName();
    if (modelName in rules) {
        for (let attributeName in rules[modelName]) {
            for (let cond in rules[modelName][attributeName]) {
                if (typeof conditions[cond] === 'function') {
                    if (!conditions[cond](model, attributeName, rules[modelName][attributeName])) {
                        let err = { attributeName: attributeName, message: rules[modelName][attributeName].message };
                        errors = [...errors, err];
                    }
                }
            }

        }
        console.log(errors);
        errors = [];
    }
}

const conditions = {
    /**
     * 
     * @param {*} model 
     * @param {*} attributeName 
     * @param {*} attributeCondition 
     * @returns boolean
     * @description validate attribute is not empty
     */
    required: (model, attributeName, attributeCondition) => {
        let getter = conditions.createGetter(attributeName);
        let value = model[getter]() ? model[getter]() : "";
        if (!value || value.length === 0) {
            return false;
        }
        return true;
    },

    /**
     * 
     * @param {*} model 
     * @param {*} attributeName 
     * @param {*} attributeCondition 
     * @returns boolean
     * @description validate attribute as per it's type
     */
    attributeType: (model, attributeName, attributeCondition) => {
        let getter = conditions.createGetter(attributeName);
        let value = model[getter]() ? model[getter]() : "";
        if (attributeCondition['attributeType'] === 'number') {
            if (isNaN(value)) {
                return false;
            }
        }
        return true;
    },

    /**
     * 
     * @param {*} model 
     * @param {*} attributeName 
     * @param {*} attributeCondition 
     * @returns boolean
     * @description validate fields and check if it is denpendent on other field and all fields are validated
     */
    dependencyOn: (model, attributeName, attributeCondition) => {
        const modelName = model.constructor.getTableName();
        attributeCondition['dependencyOn'].map(attrName => {
            console.log(attrName);
            for (let cond in rules[modelName][attrName]) {
                if (typeof conditions[cond] === 'function') {
                    if (!conditions[cond](model, attrName, rules[modelName][attrName])) {
                        let err = { attributeName: attributeName, dependencyErrors: {
                            attributeName: attrName, message: rules[modelName][attrName].message
                        } };
                        errors = [...errors, err];
                    }
                }
            }
        });

        return true;
    },

    /**
     * 
     * @param {*} model 
     * @param {*} attributeName 
     * @param {*} attributeCondition 
     * @returns boolean
     * @description validate and check minimum lenth is same as defined
     */
    minLength: (model, attributeName, attributeCondition) => {
        let getter = conditions.createGetter(attributeName);
        let value = model[getter]() ? model[getter]() : "";
        if(typeof attributeCondition['minLength'] !== 'object') {
            if (value.length < attributeCondition['minLength']) {            
                return false;
            }
        } else {
            let minLength = attributeCondition['minLength']['length'];
            let message = attributeCondition['minLength']['message'];
            if (value.length < minLength) { 
                let err = { attributeName: attributeName, message: message };           
                errors = [...errors, err];
            }
        }
        
        return true;
    },

    /**
     * 
     * @param {*} model 
     * @param {*} attributeName 
     * @param {*} attributeCondition 
     * @returns boolean
     * @description validate and check maximum length is same as defined
     */
    maxLength: (model, attributeName, attributeCondition) => {
        let getter = conditions.createGetter(attributeName);
        let value = model[getter]() ? model[getter]() : "";
        if(typeof attributeCondition['maxLength'] !== 'object') {
            if (value.length !== attributeCondition['maxLength']) {            
                return false;
            }
        } else {
            let maxLength = attributeCondition['maxLength']['length'];
            let message = attributeCondition['maxLength']['message'];
            if (value.length !== maxLength) { 
                let err = { attributeName: attributeName, message: message };           
                errors = [...errors, err];
            }
        }
        return true;
    },

    /**
     * 
     * @param {*} str 
     * @returns string
     * @description it will create a attribute getter
     */
    createGetter: (str) => {
        return 'get' + (str.slice(0, 1)).toUpperCase() + str.slice(1, str.length);
    }
}

module.exports.validateModel = validateModel;
