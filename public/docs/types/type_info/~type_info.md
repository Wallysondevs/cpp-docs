# std::type_info::~type_info

virtual ~type_info();

  
Destrói um objeto do tipo [std::type_info](<#/doc/types/type_info>). Este destrutor é public virtual, tornando a [std::type_info](<#/doc/types/type_info>) uma classe polimórfica. 

### Notas

O tipo dinâmico de um [std::type_info](<#/doc/types/type_info>) subobjeto pode ser examinado pelo operador [`typeid`](<#/doc/language/typeid>). 

É não especificado se a implementação chama este destrutor para qualquer [std::type_info](<#/doc/types/type_info>) objeto no final do programa. 