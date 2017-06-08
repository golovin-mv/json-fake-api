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

module.exports = [one, one2, shema, shema2];
