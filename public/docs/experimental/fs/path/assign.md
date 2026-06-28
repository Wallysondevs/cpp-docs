# std::experimental::filesystem::path::assign

template< class Source >  
path& assign( const Source& source ); |  (1)  |  (filesystem TS)  
template< class InputIt >  
path& assign( InputIt first, InputIt last ); |  (2)  |  (filesystem TS)  

  
Atribui o conteúdo ao objeto `path`. 

1) Atribui o range de `source`. | Esta seção está incompleta   
  
2) Atribui o nome do caminho identificado pelo range `[`first`, `last`)`.

### Parâmetros

source  |  \-  |  um range para atribuir   
---|---|---
first, last  |  \-  |  um range para atribuir   
Requisitos de tipo   
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).   
-O tipo de valor de `InputIt` deve ser um dos tipos de caractere codificados (`char`, `wchar_t`, `char16_t` e `char32_t`).   
  
### Valor de retorno

`*this`

### Exceções

| Esta seção está incompleta   
  
### Veja também

[ `operator=`](<#/>) |  atribui outro `path`   
(função membro pública)  