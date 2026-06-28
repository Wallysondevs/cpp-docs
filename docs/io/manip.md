# Manipuladores de entrada/saída

Manipuladores são funções auxiliares que possibilitam controlar streams de entrada/saída usando operator<< ou operator>>.

Os manipuladores que são invocados sem argumentos (e.g. [std::cout](<#/doc/io/cout>) << [std::boolalpha](<#/doc/io/manip/boolalpha>); ou [std::cin](<#/doc/io/cin>) >> [std::hex](<#/doc/io/manip/hex>);) são implementados como funções que recebem uma referência a um stream como seu único argumento. As sobrecargas especiais de [`basic_ostream::operator<<`](<#/doc/io/basic_ostream/operator_ltlt>) e [`basic_istream::operator>>`](<#/doc/io/basic_istream/operator_gtgt>) aceitam ponteiros para essas funções. Essas funções (ou instanciações de function templates) são as únicas [funções endereçáveis](<#/doc/language/extending_std>) na standard library.(desde C++20)

Os manipuladores que são invocados com argumentos (e.g. [std::cout](<#/doc/io/cout>) << [std::setw](<#/doc/io/manip/setw>)(10);) são implementados como funções que retornam objetos de tipo não especificado. Esses manipuladores definem seus próprios `operator<<` ou `operator>>` que realizam a manipulação solicitada.

Definido no header `[<ios>](<#/doc/header/ios>)`
---
[ boolalphanoboolalpha](<#/doc/io/manip/boolalpha>) | alterna entre representação textual e numérica de booleanos
(function)
[ showbasenoshowbase](<#/doc/io/manip/showbase>) | controla se um prefixo é usado para indicar a base numérica
(function)
[ showpointnoshowpoint](<#/doc/io/manip/showpoint>) | controla se o ponto decimal é sempre incluído na representação de ponto flutuante
(function)
[ showposnoshowpos](<#/doc/io/manip/showpos>) | controla se o sinal `+` é usado com números não negativos
(function)
[ skipwsnoskipws](<#/doc/io/manip/skipws>) | controla se espaços em branco iniciais são ignorados na entrada
(function)
[ uppercasenouppercase](<#/doc/io/manip/uppercase>) | controla se caracteres maiúsculos são usados em alguns formatos de saída
(function)
[ unitbufnounitbuf](<#/doc/io/manip/unitbuf>) | controla se a saída é descarregada após cada operação
(function)
[ internalleftright](<#/doc/io/manip/left>) | define o posicionamento dos caracteres de preenchimento
(function)
[ dechexoct](<#/doc/io/manip/hex>) | muda a base usada para I/O de inteiros
(function)
[ fixedscientifichexfloatdefaultfloat](<#/doc/io/manip/fixed>)(C++11)(C++11) | muda a formatação usada para I/O de ponto flutuante
(function)
Definido no header `[<istream>](<#/doc/header/istream>)`

```cpp
 ws
(function template)
Definido no header `<ostream>`
 ends
(function template)
 flush
(function template)
 endl
(function template)
 emit_on_flushnoemit_on_flush(C++20)
(function template)
 flush_emit(C++20)
(function template)
Definido no header `<iomanip>`
 resetiosflags
(function)
 setiosflags
(function)
 setbase
(function)
 setfill
(function template)
 setprecision
(function)
 setw
(function)
 get_money(C++11)
(function template)
 put_money(C++11)
(function template)
 get_time(C++11)
(function template)
 put_time(C++11)
(function template)
 quoted(C++14)
(function template)
```
