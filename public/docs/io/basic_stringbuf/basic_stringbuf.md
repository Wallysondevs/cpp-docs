# std::basic_stringbuf&lt;CharT,Traits,Allocator&gt;::basic_stringbuf

```cpp
  // (1)
explicit basic_stringbuf( std::ios_base::openmode which =
std::ios_base::in | std::ios_base::out ); |  | (ate C++11)
explicit basic_stringbuf( std::ios_base::openmode which );  // (desde C++11)
basic_stringbuf()
: basic_stringbuf( std::ios_base::in | std::ios_base::out ) {}  // (2) (desde C++11)
explicit
basic_stringbuf( const std::basic_string<CharT, Traits, Allocator>& s,
std::ios_base::openmode which =
std::ios_base::in | std::ios_base::out );  // (3)
explicit basic_stringbuf( std::basic_string<CharT, Traits, Allocator>&& s,
std::ios_base::openmode which =
std::ios_base::in | std::ios_base::out );  // (4) (desde C++20)
basic_stringbuf( std::ios_base::openmode which, const Allocator& a );  // (5) (desde C++20)
explicit basic_stringbuf( const Allocator& a )
: basic_stringbuf( std::ios_base::in | std::ios_base::out, a ) {}  // (6) (desde C++20)
template< class SAlloc >
explicit basic_stringbuf( const std::basic_string<CharT, Traits, SAlloc>& s,
std::ios_base::openmode which =
std::ios_base::in | std::ios_base::out );  // (7) (desde C++20)
template< class SAlloc >
basic_stringbuf( const std::basic_string<CharT, Traits, SAlloc>& s,
std::ios_base::openmode which, const Allocator& a );  // (8) (desde C++20)
template< class SAlloc >
basic_stringbuf( const std::basic_string<CharT, Traits, SAlloc>& s,
const Allocator& a )
: basic_stringbuf( s, std::ios_base::in | std::ios_base::out, a ) {}  // (9) (desde C++20)
template< class StringViewLike >
explicit basic_stringbuf( const StringViewLike& t,
std::ios_base::openmode which =
std::ios_base::in | std::ios_base::out );  // (10) (desde C++26)
template< class StringViewLike >
basic_stringbuf( const StringViewLike& t,
std::ios_base::openmode which, const Allocator& a );  // (11) (desde C++26)
template< class StringViewLike >
basic_stringbuf( const StringViewLike& t, const Allocator& a );  // (12) (desde C++26)
basic_stringbuf( basic_stringbuf&& rhs );  // (13) (desde C++11)
basic_stringbuf( basic_stringbuf&& rhs, const Allocator& a );  // (14) (desde C++20)
basic_stringbuf( const basic_stringbuf& rhs ) = delete;  // (15) (desde C++11)
```

  
A base [std::basic_streambuf](<#/doc/io/basic_streambuf>) e os [membros de dados apenas para exposição](<#/doc/io/basic_stringbuf>) `_buf_` e `_mode_` são inicializados da seguinte forma.

Após inicializar esses subobjetos, as sobrecargas (3-12) inicializam as sequências de entrada e saída como se chamassem [`_init_buf_ptrs_()`](<#/doc/io/basic_stringbuf/init_buf_ptrs>).

Sobrecarga  |  Base [std::basic_streambuf](<#/doc/io/basic_streambuf>)  | `_buf_` | `_mode_` (1) | inicializada por padrão  | definido pela implementação
---|---|---
(veja abaixo)  | which  
(2) |  [std::ios_base::in](<#/doc/io/ios_base/openmode>) |  
[std::ios_base::out](<#/doc/io/ios_base/openmode>)  
(3) | s | which
---|---|---
(4) | std::move(s)  
(5) | a  
(6) |  [std::ios_base::in](<#/doc/io/ios_base/openmode>) |  
[std::ios_base::out](<#/doc/io/ios_base/openmode>)  
(7) | s | which  
---|---|---
(8) | {s, a}  
(9) |  [std::ios_base::in](<#/doc/io/ios_base/openmode>) |  
[std::ios_base::out](<#/doc/io/ios_base/openmode>)  
(10) | {sv, Allocator()} | which  
---|---|---
(11) | {sv, a}  
(12) |  [std::ios_base::in](<#/doc/io/ios_base/openmode>) |  
[std::ios_base::out](<#/doc/io/ios_base/openmode>)  
(13) | rhs  
---|---
(copiado por construção)  | std::move(rhs).str() | rhs.mode  
(14) |  {std::move(rhs).str(), a}  
  
1,2) A sobrecarga (1)(ate C++11)(2)(desde C++11) é o construtor padrão. É definido pela implementação se os ponteiros de sequência ([eback()](<#/doc/io/basic_streambuf/gptr>), [gptr()](<#/doc/io/basic_streambuf/gptr>), [egptr()](<#/doc/io/basic_streambuf/gptr>), [pbase()](<#/doc/io/basic_streambuf/pptr>), [pptr()](<#/doc/io/basic_streambuf/pptr>), [epptr()](<#/doc/io/basic_streambuf/pptr>)) são inicializados para ponteiros nulos.

5,6) Quando a construção é concluída, str.empty() é true.

7) Esta sobrecarga participa da resolução de sobrecarga apenas se [std::is_same_v](<#/doc/types/is_same>)<SAlloc, Allocator> for false.

10-12) Converte implicitamente t para uma string view sv como se por [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> sv = t;, então é usada como acima na tabela.

Estas sobrecargas participam da resolução de sobrecarga apenas se [std::is_convertible_v](<#/doc/types/is_convertible>)<const StringViewLike&,  
[std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>> for true.

13,14) A sobrecarga (13) é o construtor de movimento (move constructor). É definido pela implementação se os seis ponteiros de sequência em *this obtêm os valores que rhs possuía.

Quando a construção é concluída, rhs está vazio, mas utilizável, e 

  * Seja rhs_p o estado de rhs imediatamente antes desta construção, as seguintes expressões serão avaliadas como true: 

    

  * str() == rhs_p.str()
  * getloc() == rhs_p.getloc()
  * gptr() - eback() == rhs_p.gptr() - rhs_p.eback()
  * egptr() - eback() == rhs_p.egptr() - rhs_p.eback()
  * pptr() - pbase() == rhs_p.pptr() - rhs_p.pbase()
  * epptr() - pbase() == rhs_p.epptr() - rhs_p.pbase()

  * Seja rhs_a o estado de rhs imediatamente após esta construção, as seguintes expressões serão avaliadas como true: 

    

  * !eback() || eback() != rhs_a.eback()
---|---|---
  * !gptr() || gptr() != rhs_a.gptr()
  * !egptr() || egptr() != rhs_a.egptr()
  * !pbase() || pbase() != rhs_a.pbase()
  * !pptr() || pptr() != rhs_a.pptr()
  * !epptr() || epptr() != rhs_a.epptr()

15) O construtor de cópia é deletado; `std::basic_stringbuf` não é [CopyConstructible](<#/doc/named_req/CopyConstructible>).

### Parâmetros

s  |  \-  |  um [std::basic_string](<#/doc/string/basic_string>) usado para inicializar o buffer t  |  \-  |  um objeto (convertível para [std::basic_string_view](<#/doc/string/basic_string_view>)) usado para inicializar o buffer a  |  \-  |  outro allocator usado para construir o [std::basic_string](<#/doc/string/basic_string>) interno rhs  |  \-  |  outro `basic_stringbuf` which  |  \-  |  especifica o modo de abertura do stream. É um tipo bitmask, as seguintes constantes são definidas:  |  Constante  |  Explicação [`app`](<#/doc/io/ios_base/openmode>) |  busca o final do stream antes de cada escrita
---|---
[`binary`](<#/doc/io/ios_base/openmode>) |  abre em [modo binário](<#/doc/io/c/FILE>)  
[`in`](<#/doc/io/ios_base/openmode>) |  abre para leitura   
[`out`](<#/doc/io/ios_base/openmode>) |  abre para escrita   
[`trunc`](<#/doc/io/ios_base/openmode>) |  descarta o conteúdo do stream ao abrir   
[`ate`](<#/doc/io/ios_base/openmode>) |  busca o final do stream imediatamente após a abertura   
[`noreplace`](<#/doc/io/ios_base/openmode>) (C++23) |  abre em modo exclusivo   
  
### Notas

Tipicamente chamado pelo construtor de [std::basic_stringstream](<#/doc/io/basic_stringstream>). 

O nível de suporte para os modos de abertura diferentes de [std::ios_base::in](<#/doc/io/ios_base/openmode>) e [std::ios_base::out](<#/doc/io/ios_base/openmode>) varia entre as implementações. C++11 especifica explicitamente o suporte para [std::ios_base::ate](<#/doc/io/ios_base/openmode>) em [str()](<#/doc/io/basic_stringbuf/str>) e neste construtor, mas [std::ios_base::app](<#/doc/io/ios_base/openmode>), [std::ios_base::trunc](<#/doc/io/ios_base/openmode>) e [std::ios_base::binary](<#/doc/io/ios_base/openmode>) têm efeitos diferentes em diferentes implementações. 

Macro de teste de recurso  | Valor | Padrão | Recurso   
---|---|---|---
[`__cpp_lib_sstream_from_string_view`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Interface de streams de string com [std::string_view](<#/doc/string/basic_string_view>)  
  
### Exemplo

Demonstra a chamada direta do construtor de `std::basic_stringbuf`:

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        // construtor padrão (modo = in | out)
        std::stringbuf buf1;
        buf1.sputc('1');
        std::cout << &buf1 << '\n';
     
        // construtor de string em modo "at-end" (desde C++11)
        std::stringbuf buf2("test", std::ios_base::in
                                  | std::ios_base::out
                                  | std::ios_base::ate);
        buf2.sputc('1');
        std::cout << &buf2 << '\n';
     
        // teste de modo de anexação (resultados diferem entre compiladores)
        std::stringbuf buf3("test", std::ios_base::in
                                  | std::ios_base::out
                                  | std::ios_base::app);
        buf3.sputc('1');
        buf3.pubseekpos(1);
        buf3.sputc('2');
        std::cout << &buf3 << '\n';
    }
```

Saída: 
```
    1
    test1
    est12 (Sun Studio) 2st1 (GCC)
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
[LWG 432](<https://cplusplus.github.io/LWG/issue432>) | C++98  | 1. a sobrecarga (1) não alocava nenhum objeto array  
2. a sobrecarga (3) não especificava como as sequências de entrada  
e saída são inicializadas  | 1. removeu a limitação  
2. especificado   
[LWG 562](<https://cplusplus.github.io/LWG/issue562>) | C++98  | a sobrecarga (3) definia [epptr()](<#/doc/io/basic_streambuf/pptr>) para apontar um caractere além do último caractere subjacente se bool(which & [std::ios_base::out](<#/doc/io/ios_base/openmode>)) == true | [epptr()](<#/doc/io/basic_streambuf/pptr>) pode ser definido  
além dessa posição   
[P0935R0](<https://wg21.link/P0935R0>) | C++11  | o construtor padrão era explicit  | tornou-se implícito   
  
### Veja também

[ (constructor)](<#/doc/io/basic_stringstream/basic_stringstream>) |  constrói o stream de string   
(função membro pública de `std::basic_stringstream<CharT,Traits,Allocator>`)  