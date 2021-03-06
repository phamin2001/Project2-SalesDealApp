# Project2_SalesDealApp
### User Story:
1. User can log in.
2. User see her profile.
3. User can edit or delete her profile.
4. User can add favorite brands to her profile from database.
5. If a brand doesn’t exist user can create it.
6. User can see all brands and stores or just a specific one, delete, edit, and update them.
7. User can see deals based on her favorite brands/store collections. 
8. User can log out.

## Model:
User:
```
    name:       {type: String, required: true},
    lastname:   {type: String},
    username:   {type: String, required: true, unique: true},
    password:   {type: String, required: true, unique: true},
    brands:     [Brand.schema]
```

Brands:
```
    name:      {type: String, required: true},
    category:  {type: String, required: true}
```

Deal:
```
    percent:    {type: Number, required: true},
    category:   {type: String, required: true},
    brands     :    [{type: mongoose.Schema.Types.ObjectId, ref: 'Brand'}]
```

## Wireframes:

![IMG_3150](https://user-images.githubusercontent.com/26368039/55023039-9181dc00-4fc1-11e9-9c71-fd54bb009ac0.jpg)

![IMG_3151](https://user-images.githubusercontent.com/26368039/55023094-aeb6aa80-4fc1-11e9-9b06-1fcd6f99c4c6.jpg)

