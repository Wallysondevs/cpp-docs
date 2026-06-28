# std::basic_spanbuf&lt;CharT,Traits&gt;::seekoff

protected:  
pos_type seekoff( off_type off, [std::ios_base::seekdir](<#/doc/io/ios_base/seekdir>) dir,  
[std::ios_base::openmode](<#/doc/io/ios_base/openmode>) which =   
[std::ios_base::in](<#/doc/io/ios_base/openmode>) | [std::ios_base::out](<#/doc/io/ios_base/openmode>) ) override; |  |  (desde C++23)  

  
Reposiciona o próximo ponteiro para a área de leitura (get) e/ou escrita (put), se possível, para a posição que corresponde a exatamente `off` caracteres a partir do início, fim ou posição atual da área de leitura e/ou escrita do buffer.

Seja `_n_` o número de elementos `CharT` no buffer subjacente, ou ​0​ quando não há buffer subjacente, esta função falha se

  * o próximo ponteiro para a área de leitura e/ou escrita a ser reposicionada é nulo e o `_newoff_` calculado (veja abaixo) não é zero, o que pode ocorrer se não houver buffer subjacente, ou se *this não estiver aberto no modo exigido por `which`, ou
  * `dir` é [std::ios_base::cur](<#/doc/io/ios_base/seekdir>) e ambos [std::ios_base::in](<#/doc/io/ios_base/openmode>) e [std::ios_base::out](<#/doc/io/ios_base/openmode>) estão definidos em `which`, ou
  * o `_newoff_` calculado não é representável em `off_type`, é menor que zero, ou maior que `_n_`.

`_newoff_` é calculado como segue:

  * Se `dir` for [std::ios_base::beg](<#/doc/io/ios_base/seekdir>), `_newoff_` é `off`.
  * Se `dir` for [std::ios_base::cur](<#/doc/io/ios_base/seekdir>), `_newoff_` é
    * pptr() - pbase() + off se [std::ios_base::out](<#/doc/io/ios_base/openmode>) estiver definido em `which`, ou
    * gptr() - eback() + off se [std::ios_base::in](<#/doc/io/ios_base/openmode>) estiver definido em `which`.
  * Se `dir` for [std::ios_base::end](<#/doc/io/ios_base/seekdir>), `_newoff_` é
    * pptr() - pbase() + off se [std::ios_base::out](<#/doc/io/ios_base/openmode>) mas não [std::ios_base::in](<#/doc/io/ios_base/openmode>) estiver definido no modo de abertura de *this,
    * caso contrário, off + n.

Esta função reposiciona o próximo ponteiro para a área de leitura e/ou escrita para pbuf + newoff em caso de sucesso se [std::ios_base::in](<#/doc/io/ios_base/openmode>) e/ou [std::ios_base::out](<#/doc/io/ios_base/openmode>) estiverem correspondentemente definidos em `which`, onde `_pbuf_` é o ponteiro para o início do buffer subjacente, ou o valor do ponteiro nulo se não houver buffer subjacente.

### Parameters

off  |  \-  |  posição relativa para definir o(s) próximo(s) ponteiro(s)   
---|---
dir  |  \-  |  define a posição base para aplicar o offset relativo. Pode ser uma das seguintes constantes:  |  Constante  |  Explicação   
[`beg`](<#/doc/io/ios_base/seekdir>) |  o início de um stream   
[`end`](<#/doc/io/ios_base/seekdir>) |  o fim de um stream   
[`cur`](<#/doc/io/ios_base/seekdir>) |  a posição atual do indicador de posição do stream   
which  |  \-  |  define se as sequências de entrada, a sequência de saída, ou ambas são afetadas. Pode ser uma ou uma combinação das seguintes constantes:  |  Constante  |  Explicação   
[`in`](<#/doc/io/ios_base/openmode>) |  afeta a sequência de entrada   
[`out`](<#/doc/io/ios_base/openmode>) |  afeta a sequência de saída   
  
### Return value

pos_type(newoff) em caso de sucesso, pos_type(off_type(-1)) em caso de falha.

### Example

| Esta seção está incompleta  
Razão: sem exemplo   
  
### See also

[ seekoff](<#/doc/io/basic_stringbuf/seekoff>)[virtual] |  reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas, usando endereçamento relativo   
(função membro virtual protegida de `std::basic_stringbuf<CharT,Traits,Allocator>`)  
[ seekoff](<#/doc/io/strstreambuf/seekoff>)[virtual] |  reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas, usando endereçamento relativo   
(função membro virtual protegida de `std::strstreambuf`)