# std::basic_filebuf&lt;CharT,Traits&gt;::overflow

protected:  
virtual int_type overflow ( int_type c = Traits::eof() );

  
Escreve alguns dados da área de escrita (put area) para a sequência de caracteres associada (para o arquivo).

Comporta-se como a classe base [std::basic_streambuf::overflow](<#/doc/io/basic_streambuf/overflow>), exceto que para escrever os dados, primeiro usa [std::codecvt::out](<#/doc/locale/codecvt/out>) da locale imbuída para converter os caracteres em uma representação externa (possivelmente multibyte), armazenada em um buffer temporário (alocado com o tamanho necessário), e então usa E/S de arquivo para copiar todos os bytes totalmente convertidos para o arquivo.

Se [std::codecvt::always_noconv](<#/doc/locale/codecvt/always_noconv>) for true, a chamada para [std::codecvt::out](<#/doc/locale/codecvt/out>) pode ser ignorada.

Se a conversão falhar com [std::codecvt_base::error](<#/doc/locale/codecvt_base>), retorna Traits::eof() sem tentar nenhuma saída.

Se o arquivo associado não estiver aberto (is_open() == false), retorna Traits::eof() antes de fazer qualquer coisa.

### Parâmetros

(nenhum)

### Valor de retorno

Traits::not_eof(c) para indicar sucesso ou Traits::eof() para indicar falha.

### Exemplo

| Esta seção está incompleta  
Motivo: nenhum exemplo   
  
### Veja também

[ overflow](<#/doc/io/basic_streambuf/overflow>)[virtual] | escreve caracteres para a sequência de saída associada a partir da área de escrita (put area)   
(função membro virtual protegida de `std::basic_streambuf<CharT,Traits>`)  
[ underflow](<#/doc/io/basic_filebuf/underflow>)[virtual] | lê do arquivo associado   
(função membro virtual protegida)