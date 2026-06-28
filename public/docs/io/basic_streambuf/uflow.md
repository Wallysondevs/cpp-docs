# std::basic_streambuf&lt;CharT,Traits&gt;::uflow

protected:  
virtual int_type uflow();

  
Garante que pelo menos um caractere esteja disponível na área de entrada, atualizando os ponteiros para a área de entrada (se necessário). Em caso de sucesso, retorna o valor desse caractere e avança o valor do _ponteiro de leitura_ em um caractere. Em caso de falha, retorna traits::eof().

A função pode atualizar os ponteiros `gptr`, `egptr` e `eback` para definir a localização dos dados recém-carregados (se houver). Em caso de falha, a função garante que `gptr()` == `nullptr` ou `gptr()` == `egptr`.

A versão da classe base da função chama [underflow()](<#/doc/io/basic_streambuf/underflow>) e incrementa [gptr()](<#/doc/io/basic_streambuf/gptr>).

### Parâmetros

(nenhum)

### Valor de retorno

O valor do caractere que era apontado pelo _ponteiro de leitura_ antes de ser avançado em um, ou `traits::eof()` caso contrário.

A versão da classe base da função retorna o valor retornado por [underflow()](<#/doc/io/basic_streambuf/underflow>).

### Nota

As funções públicas de [std::streambuf](<#/doc/io/basic_streambuf>) chamam esta função somente se `gptr()` == `nullptr` ou `gptr()` >= `egptr()`.

As classes streambuf personalizadas que não usam a área de leitura e não definem os ponteiros da área de leitura em basic_streambuf são obrigadas a sobrescrever esta função.

### Exemplo

| Esta seção está incompleta  
Razão: sem exemplo   
  
### Ver também

[ underflow](<#/doc/io/basic_streambuf/underflow>)[virtual] | lê caracteres da sequência de entrada associada para a área de leitura   
(função membro virtual protegida)  
[ overflow](<#/doc/io/basic_streambuf/overflow>)[virtual] | escreve caracteres da área de escrita para a sequência de saída associada   
(função membro virtual protegida)