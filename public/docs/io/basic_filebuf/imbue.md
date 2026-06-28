# std::basic_filebuf&lt;CharT,Traits&gt;::imbue

protected:  
virtual void imbue( const [std::locale](<#/doc/locale/locale>)& loc )

  
Altera o locale associado para que todos os caracteres inseridos ou extraídos após esta chamada (e até outra chamada para `imbue()`) sejam convertidos usando a facet [std::codecvt](<#/doc/locale/codecvt>) de `loc`.

Se a codificação do locale antigo for dependente de estado e o arquivo não estiver posicionado no início, então o novo locale deve ter a mesma facet [std::codecvt](<#/doc/locale/codecvt>) que a previamente imbuída.

### Parameters

loc  |  \-  |  o locale para imbuir o stream   
  
### Return value

(nenhum) 

### Example

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### See also

[ imbue](<#/doc/io/basic_streambuf/pubimbue>)[virtual] |  reage a uma mudança do locale associado   
(função membro virtual protegida de `std::basic_streambuf<CharT,Traits>`)  
[ imbue](<#/doc/io/basic_ios/imbue>) |  define o locale   
(função membro pública de `std::basic_ios<CharT,Traits>`)