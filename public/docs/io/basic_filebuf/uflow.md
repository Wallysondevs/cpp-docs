# std::basic_filebuf&lt;CharT,Traits&gt;::uflow

protected:  
virtual int_type uflow()

  
Comporta-se como [underflow()](<#/doc/io/basic_streambuf/underflow>), exceto que se [underflow()](<#/doc/io/basic_streambuf/underflow>) for bem-sucedido (não retornar Traits::eof()), então avança o ponteiro `next` para a `get area`. Em outras palavras, consome um dos caracteres obtidos por [underflow()](<#/doc/io/basic_streambuf/underflow>). 

### Parâmetros

(nenhum) 

### Valor de retorno

O valor do caractere que foi lido e consumido em caso de sucesso, ou Traits::eof() em caso de falha. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ uflow](<#/doc/io/basic_streambuf/uflow>)[virtual] | lê caracteres da sequência de entrada associada para a `get area` e avança o ponteiro `next`   
(função membro virtual protegida de `std::basic_streambuf<CharT,Traits>`)  
[ underflow](<#/doc/io/basic_filebuf/underflow>)[virtual] | lê do arquivo associado   
(função membro virtual protegida)  
[ overflow](<#/doc/io/basic_filebuf/overflow>)[virtual] | escreve caracteres para o arquivo associado a partir da `put area`   
(função membro virtual protegida)