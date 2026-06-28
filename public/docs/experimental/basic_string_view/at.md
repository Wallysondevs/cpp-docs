# std::experimental::basic_string_view&lt;CharT,Traits&gt;::at

constexpr const_reference at(size_type pos) const; |  |  (library fundamentals TS)  

  
Retorna uma referência para o caractere na localização `pos` especificada. A verificação de limites é realizada; uma exceção do tipo [std::out_of_range](<#/doc/error/out_of_range>) será lançada em caso de acesso inválido. 

### Parâmetros

pos  |  \-  |  posição do caractere a ser retornado   
  
### Valor de retorno

Referência para o caractere solicitado. 

### Exceções

Lança [std::out_of_range](<#/doc/error/out_of_range>) se pos >= size(). 

### Complexidade

Constante. 

### Veja também

[ operator[]](<#/doc/experimental/basic_string_view/operator_at>) |  acessa o caractere especificado   
(função membro pública)  