# std::experimental::filesystem::swap(std::experimental::filesystem::path)

void swap( path& lhs, path& rhs ); |  |  (filesystem TS)  

  
Troca o estado de `lhs` com o de `rhs`. Efetivamente chama `lhs.swap(rhs)`. 

### Parâmetros

lhs, rhs  |  \-  |  paths cujos estados serão trocados   
  
### Valor de retorno

(nenhum) 

### Exceções

Especificação [`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept

### Veja também

[ swap](<#/doc/experimental/fs/path/swap>) |  troca dois paths   
(função membro pública)  