# std::experimental::filesystem::recursive_directory_iterator::recursive_directory_iterator

recursive_directory_iterator(); |  (1)  |  (filesystem TS)  
---|---|---
recursive_directory_iterator( const recursive_directory_iterator& ) = default; |  (2)  |  (filesystem TS)  
recursive_directory_iterator( recursive_directory_iterator&& ) = default; |  (3)  |  (filesystem TS)  
explicit recursive_directory_iterator( const path& p,  
directory_options options = directory_options::none ); |  (4)  |  (filesystem TS)  
recursive_directory_iterator( const path& p,  
directory_options options, error_code& ec ); |  (5)  |  (filesystem TS)  
---|---|---
recursive_directory_iterator( const path& p, error_code& ec ); |  (6)  |  (filesystem TS)  

  
Constrói um novo iterador de diretório recursivo.

1) Construtor padrão. Constrói um iterador de fim.

2,3) Construtores de cópia e movimento padrão.

4-6) Constrói um iterador que se refere à primeira entrada no diretório para o qual `p` se resolve.

| Esta seção está incompleta  
Razão: erros   
  
### Parâmetros

| Esta seção está incompleta   
  
### Exceções

1,5,6)

`noexcept`(<../../../language/noexcept_spec.html> "cpp/language/noexcept spec") especificação: 

noexcept

| Esta seção está incompleta   
  
### Observações

Iteradores de diretório recursivos não seguem links simbólicos de diretório por padrão. Para habilitar este comportamento, especifique `directory_options::follow_directory_symlink` no conjunto de opções.