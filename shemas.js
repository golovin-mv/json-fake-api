const shema = {
  path: '/folders/roots',
  type: 'object',
  properties: {
    items: {
      type: 'array',
      maxItems: 5,
      minItems: 2,
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer'
          },
          name: {
            type: 'string',
            maxLength: 400
          },
          parentId: {
            type: 'integer'
          },
          type: {
            type: 'string',
            pattern: 'EMPLOYEE|REGCARD'
          },
          favorite: {
            type: 'boolean'
          }
        },
        required: ['id', 'name', 'type']
      }
    },
    totalCount: {
      type: 'integer',
      maximum: 100000,
    },
  },
  required: ['items', 'totalCount'],
};

const shema2 = {
  path: '/children',
  type: 'object',
  properties: {
    items: {
      type: 'array',
      maxItems: 30,
      minItems: 2,
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'integer'
          },
          name: {
            type: 'string',
            maxLength: 400
          },
          parentId: {
            type: 'integer'
          },
          type: {
            type: 'string',
            pattern: 'EMPLOYEE|REGCARD'
          },
          favorite: {
            type: 'boolean'
          }
        },
        required: ['id', 'name', 'type']
      }
    },
    totalCount: {
      type: 'integer',
      maximum: 100000,
    },
  },
  required: ['items', 'totalCount'],
};

const one = {
  path: '/folders/create',
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    name: {
      type: 'string',
      maxLength: 400,
      minLength: 50
    },
    parentId: {
      type: 'integer'
    },
    type: {
      type: 'string',
      pattern: 'EMPLOYEE|REGCARD'
    },
    favorite: {
      type: 'boolean'
    }
  },
  required: ['id', 'name', 'type'],
};

const one2 = {

  path: 'folders/update',
  type: 'object',
  properties: {
    id: {
      type: 'integer'
    },
    name: {
      type: 'string',
      maxLength: 400,
      minLength: 50
    },
    parentId: {
      type: 'integer'
    },
    type: {
      type: 'string',
      pattern: 'EMPLOYEE|REGCARD'
    },
    favorite: {
      type: 'boolean'
    }
  },
  required: ['id', 'name', 'type'],
};
const opf = {
  path: '/opf',
  type: 'object',
  properties: {
    totalCount: {
      type: 'integer'
    },
    items: {
      type: 'array',
      maxItems: 200,
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            maxLength: 700,
            minLength: 700
          },
          code: {
            type: 'integer'
          }
        },
        required: ['name', 'code']
      }
    }
  },
  required: ['totalCount', 'items']
};
// const employee = {
//   path: '/employee',
//   type: 'object',
//   properties: {
//     totalCount: {
//       type: 'integer'
//     },
//     items: {
//       type: 'array',
//       maxItems: 50,
//       minItems: 1,
//       items: {
//         type: 'object',
//         properties: {
//           name: {
//             type: 'string',
//             pattern: '[A-Z]{1}[a-z]+ [A-Z][.][A-Z][.]'
//           },
//           post: {
//             type: 'object',
//             properties: {
//               name: {
//                 type: 'string'
//               }
//             },
//             required: ['name']
//           },
//           organization: {
//             type: 'object',
//             properties: {
//               name: {
//                 type: 'string'
//               }
//             },
//             required: ['name']
//           }
//         },
//         required: ['name']
//       }
//     }
//   },
//   required: ['totalCount', 'items']
// };
const nomenclatyre = {
  path: 'api/registration_places/',
  type: 'object',
  properties: {
    totalCount: {
      type: 'integer'
    },
    items: {
      type: 'array',
      maxItems: 100,
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            faker: 'random.uuid'
          },
          registrationPlace: {
            type: 'object'
          },
          status: {
            type: 'string',
            pattern: 'ACTIVE|DELETED|NOT_ACTUAL'
          },
          year: {
            type: 'integer',
            pattern: '[1-9]{4}'
          }
        },
        required: ['id', 'registrationPlace', 'status', 'year']
      }
    }
  },
  required: ['totalCount', 'items']
};

const caseFiles = {
  path: '/casefiles',
  type: 'object',
  properties: {
    totalCount: {
      type: 'integer'
    },
    items: {
      type: 'array',
      maxItems: 300,
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            faker: 'random.uuid'
          },
          name: {
            type: 'string',
            faker: {
              'lorem.sentence': [10, 5]
            }
          },
          nomenclature: {
            type: 'object'
          },
          chancelleryIndex: {
            type: 'string',
            faker: 'random.uuid'
          },
          caseIndex: {
            type: 'string',
            faker: 'random.uuid'
          },
          openDate: {
            type: 'string',
            faker: 'date.past'
          },
          closeDate: {
            type: 'string',
            faker: 'date.past'
          },
          period: {
            type: 'object'
          },
          description: {
            type: 'string',
            maxLength: 400
          },
          status: {
            type: 'string',
            pattern: 'ACTIVE|CLOSED'
          }
        },
        required: ['id', 'name', 'nomenclature', 'chancelleryIndex', 'caseIndex', 'openDate', 'closeDate', 'period', 'description', 'status']
      }
    }
  },
  required: ['totalCount', 'items']
};

module.exports = [nomenclatyre, caseFiles];
