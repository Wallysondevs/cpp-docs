# std::basic_ios&lt;CharT,Traits&gt;::init

protected:  
void init( [std::basic_streambuf](<#/doc/io/basic_streambuf>)<CharT,Traits>* sb );

  
Define o stream buffer associado como sb e inicializa o estado interno.

As pós-condições são as seguintes:

Elemento  |  Valor   
---|---
[rdbuf()](<#/doc/io/basic_ios/rdbuf>) |  sb  
[tie()](<#/doc/io/basic_ios/tie>) |  ponteiro nulo   
[rdstate()](<#/doc/io/basic_ios/rdstate>) |  goodbit se sb não for um ponteiro nulo, caso contrário badbit  
[exceptions()](<#/doc/io/basic_ios/exceptions>) |  goodbit  
[`flags()`](<#/doc/io/ios_base/flags>) |  skipws | dec  
[`width()`](<#/doc/io/ios_base/width>) |  ​0​  
[`precision()`](<#/doc/io/ios_base/precision>) |  6  
[fill()](<#/doc/io/basic_ios/fill>) |  widen(' ')  
[`getloc()`](<#/doc/io/ios_base/getloc>) |  uma cópia do valor retornado por [std::locale](<#/doc/locale/locale>)()  
  
Esta função membro é protegida: ela é chamada pelos construtores das classes de stream derivadas [std::basic_istream](<#/doc/io/basic_istream>) e [std::basic_ostream](<#/doc/io/basic_ostream>) assim que o stream buffer associado é conhecido. Até que esta função seja chamada, toda função membro (incluindo o destrutor) de um [std::basic_ios](<#/doc/io/basic_ios>) construído por padrão invoca comportamento indefinido. Note que `basic_ios` é uma classe base virtual, e portanto seu construtor não é chamado pelos construtores dessas classes diretamente derivadas, razão pela qual a inicialização em duas etapas é necessária.

### Parâmetros

sb  |  \-  |  stream buffer para associar   
  
### Veja também

[ (constructor)](<#/doc/io/basic_ios/basic_ios>) |  constrói o objeto   
(função membro pública)  