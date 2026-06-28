# std::basic_ostream&lt;CharT,Traits&gt;::operator&lt;&lt;

```cpp
basic_ostream& operator<<( bool value );  // (1)
basic_ostream& operator<<( long value );  // (2)
basic_ostream& operator<<( unsigned long value );  // (3)
basic_ostream& operator<<( long long value );  // (4) (desde C++11)
basic_ostream& operator<<( unsigned long long value );  // (5) (desde C++11)
basic_ostream& operator<<( double value );  // (6)
basic_ostream& operator<<( long double value );  // (7)
basic_ostream& operator<<( const void* value );  // (8)
basic_ostream& operator<<( const volatile void* value );  // (9) (desde C++23)
basic_ostream& operator<<( std::nullptr_t );  // (10) (desde C++17)
basic_ostream& operator<<( short value );  // (11)
basic_ostream& operator<<( int value );  // (12)
basic_ostream& operator<<( unsigned short value );  // (13)
basic_ostream& operator<<( unsigned int value );  // (14)
basic_ostream& operator<<( float value );  // (15)
basic_ostream& operator<<( /* extended-floating-point-type */ value );  // (16) (desde C++23)
basic_ostream& operator<<( std::basic_streambuf<CharT, Traits>* sb );  // (17)
basic_ostream& operator<<(
std::ios_base& (*func)(std::ios_base&) );  // (18)
basic_ostream& operator<<(
std::basic_ios<CharT, Traits>& (*func)(std::basic_ios<CharT, Traits>&) );  // (19)
basic_ostream& operator<<(
std::basic_ostream<CharT, Traits>& (*func)
(std::basic_ostream<CharT, Traits>&) );  // (20)
```

Insere dados no stream.

1-8) Insere o valor.

Esta função se comporta como uma [FormattedOutputFunction](<#/doc/named_req/FormattedOutputFunction>). Após construir e verificar o objeto sentinela, insere um valor chamando [`std::num_put::put()`](<#/doc/locale/num_put/put>). Se a condição de fim de arquivo foi encontrada durante a saída (put().failed() == true), define `badbit`.

9) Equivalente a return operator<<(const_cast&lt;const void*&gt;(p));.

10) Equivalente a return *this << s;, onde s é uma string de tipo de caractere terminada em nulo definida pela implementação.

11) Insere um valor de short value.

Esta função se comporta como uma [FormattedOutputFunction](<#/doc/named_req/FormattedOutputFunction>). Após construir e verificar o objeto sentinela, insere um valor long lval como em (2), onde lval é

  * static_cast&lt;long&gt;(static_cast&lt;unsigned short&gt;(value)), se flags() & [std::ios_base::basefield](<#/doc/io/ios_base/fmtflags>) for [std::ios_base::oct](<#/doc/io/ios_base/fmtflags>) ou [std::ios_base::hex](<#/doc/io/ios_base/fmtflags>), ou
  * static_cast&lt;long&gt;(value) caso contrário.

12) Insere um valor de int value.

Esta função se comporta como uma [FormattedOutputFunction](<#/doc/named_req/FormattedOutputFunction>). Após construir e verificar o objeto sentinela, insere um valor long lval como em (2), onde lval é

  * static_cast&lt;long&gt;(static_cast&lt;unsigned int&gt;(value)), se flags() & [std::ios_base::basefield](<#/doc/io/ios_base/fmtflags>) for [std::ios_base::oct](<#/doc/io/ios_base/fmtflags>) ou [std::ios_base::hex](<#/doc/io/ios_base/fmtflags>), ou
  * static_cast&lt;long&gt;(value) caso contrário.

13,14) Insere um valor de unsigned short ou unsigned int value.

Esta função se comporta como uma [FormattedOutputFunction](<#/doc/named_req/FormattedOutputFunction>). Após construir e verificar o objeto sentinela, insere static_cast&lt;unsigned long&gt;(value) como em (3).

15) Insere um valor de float value.

Esta função se comporta como uma [FormattedOutputFunction](<#/doc/named_req/FormattedOutputFunction>). Após construir e verificar o objeto sentinela, insere static_cast&lt;double&gt;(value) como em (6).

16) Insere um valor de value. A biblioteca fornece sobrecargas para todos os [tipos de ponto flutuante estendidos](<#/doc/language/types>) cv-unqualified como o tipo do parâmetro value.

Esta função se comporta como uma [FormattedOutputFunction](<#/doc/named_req/FormattedOutputFunction>). Após construir e verificar o objeto sentinela, verifica o [rank de conversão de ponto flutuante](<#/doc/language/usual_arithmetic_conversions>) de /* extended-floating-point-type */:

  * Se o rank for menor ou igual ao de double, insere static_cast&lt;double&gt;(value) como em (6).
  * Caso contrário, se o rank for menor ou igual ao de long double, insere static_cast&lt;long double&gt;(value) como em (7).
  * Caso contrário, uma invocação desta sobrecarga é condicionalmente suportada com semântica definida pela implementação.

17) Esta função se comporta como uma [UnformattedOutputFunction](<#/doc/named_req/UnformattedOutputFunction>). Após construir e verificar o objeto sentinela, verifica se sb é um ponteiro nulo. Se for, executa setstate(badbit) e sai. Caso contrário, extrai caracteres da sequência de entrada controlada por sb e os insere em *this até que uma das seguintes condições seja satisfeita:

  * fim de arquivo ocorre na sequência de entrada;
  * a inserção na sequência de saída falha (nesse caso, o caractere a ser inserido não é extraído);
  * ocorre uma exceção (nesse caso, a exceção é capturada).

Se nenhum caractere foi inserido, executa setstate(failbit). Se uma exceção foi lançada durante a extração, define `failbit` e, se `failbit` estiver definido em [exceptions()](<#/doc/io/basic_ios/exceptions>), relança a exceção.

18-20) Chama func(*this). Essas sobrecargas são usadas para implementar manipuladores de E/S de saída, como [std::endl](<#/doc/io/manip/endl>).

### Parâmetros

- **value** — valor inteiro, de ponto flutuante, booleano ou ponteiro a ser inserido
- **func** — função a ser chamada
- **sb** — ponteiro para o buffer de stream de onde ler os dados

### Valor de retorno

1-19) *this

20) func(*this)

### Observações

Não há sobrecargas para ponteiros para membros não estáticos, ponteiros para voláteis, (até C++23) ou ponteiros de função (além daqueles com assinaturas aceitas pelas sobrecargas ([18-20](<#/doc/io/basic_ostream/operator_ltlt>))).

  * A tentativa de imprimir tais objetos invoca a conversão implícita para bool e, para qualquer valor de ponteiro não nulo, o valor 1 é impresso (a menos que `boolalpha` tenha sido definido, caso em que true é impresso).

Argumentos de caractere e string de caractere (por exemplo, do tipo char ou const char*) são tratados pelas [sobrecargas não-membro](<#/doc/io/basic_ostream/operator_ltlt2>) de operator<<.

  * A tentativa de imprimir um caractere usando a sintaxe de chamada de função membro (por exemplo, [std::cout](<#/doc/io/cout>).operator<<('c');) chamará uma das sobrecargas em ([2-5](<#/doc/io/basic_ostream/operator_ltlt>)) ou ([11-14](<#/doc/io/basic_ostream/operator_ltlt>)) e imprimirá o valor numérico.
  * A tentativa de imprimir uma string de caractere usando a sintaxe de chamada de função membro chamará a sobrecarga (8) e imprimirá o valor do ponteiro em vez disso.

A sobrecarga (10) foi adicionada pela resolução do [LWG issue 2221](<https://cplusplus.github.io/LWG/issue2221>), mas nunca é implementada em nenhuma implementação da biblioteca padrão nos modos C++11/14.

### Exemplo

Execute este código
```cpp
    #include <iomanip>
    #include <iostream>
    #include <sstream>
    
    int fun() { return 42; }
    
    int main()
    {
        std::istringstream input(" \"Some text.\" ");
        double f = 3.14;
        bool b = true;
    
        std::cout
            << fun()          // sobrecarga int (12)
            << ' '            // sobrecarga não-membro
            << std::boolalpha // sobrecarga de função (18)
            << b              // sobrecarga bool (1)
            << " "            // sobrecarga não-membro
            << std::fixed     // sobrecarga de função (18) novamente
            << f              // sobrecarga double (6)
            << input.rdbuf()  // sobrecarga streambuf
            << fun            // sobrecarga bool (1): não há sobrecarga para int(*)()
            << std::endl;     // sobrecarga de função (18) novamente
    
        int x = 0;
        int* p1 = &x;
        volatile int* p2 = &x;
        std::cout
            << "p1: " << p1 << '\n'  // sobrecarga `const void*`, imprime o endereço
            << "p2: " << p2 << '\n'; // antes de C++23 (P1147): sobrecarga bool :), porque
                // operator<<(const void*) não é uma correspondência, pois descarta o qualificador `volatile`.
                // Para corrigir isso, C++23 adiciona a sobrecarga `const volatile void*` (9),
                // que imprime o endereço como esperado.
    }
```

Saída possível:
```
    42 true 3.140000 "Some text." true
    p1: 0x7ffcea766600
    p2: 0x7ffcea766600
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
[LWG 117](<https://cplusplus.github.io/LWG/issue117>) | C++98 | sobrecargas (1-8,11-15) delegavam a inserção para
[`num_put::put`](<#/doc/locale/num_put/put>), mas não possui sobrecargas para short,
unsigned short, int, unsigned int e float | eles são convertidos
antes de serem passados
para `num_put::put`
[LWG 567](<https://cplusplus.github.io/LWG/issue567>) | C++98 | a sobrecarga (17) se comportava como uma [FormattedOutputFunction](<#/doc/named_req/FormattedOutputFunction>)
devido à resolução do [LWG issue 60](<https://cplusplus.github.io/LWG/issue60>) | ela se comporta como uma
[UnformattedOutputFunction](<#/doc/named_req/UnformattedOutputFunction>)

### Ver também

[ operator<<(std::basic_ostream)](<#/doc/io/basic_ostream/operator_ltlt2>) | insere dados de caractere ou insere em rvalue stream
(function template)
[ operator<&lt;operator&gt;>](<#/doc/string/basic_string/operator_ltltgtgt>) | realiza entrada e saída de stream em strings
(function template)
[ operator<<](<#/doc/string/basic_string_view/operator_ltlt>)(C++17) | realiza saída de stream em string views
(function template)
[ operator<&lt;operator&gt;>](<#/doc/utility/bitset/operator_ltltgtgt2>) | realiza entrada e saída de stream de bitsets
(function template)
[ operator<&lt;operator&gt;>](<#/doc/numeric/complex/operator_ltltgtgt>) | serializa e desserializa um número complexo
(function template)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/linear_congruential_engine/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream em engine de números pseudoaleatórios
(function template)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/uniform_int_distribution/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream em distribuição de números pseudoaleatórios
(function template)
[ put](<#/doc/io/basic_ostream/put>) | insere um caractere
(função membro pública)
[ write](<#/doc/io/basic_ostream/write>) | insere blocos de caracteres
(função membro pública)
[ to_chars](<#/doc/utility/to_chars>)(C++17) | converte um valor inteiro ou de ponto flutuante para uma sequência de caracteres
(função)