# std::basic_stringbuf&lt;CharT,Traits,Allocator&gt;::str

```cpp
  // (1)
std::basic_string<CharT, Traits, Allocator> str() const; |  | (ate C++20)
std::basic_string<CharT, Traits, Allocator> str() const&;  // (desde C++20)
template<class SAlloc>
std::basic_string<CharT, Traits, SAlloc> str( const SAlloc& a ) const;  // (2) (desde C++20)
std::basic_string<CharT, Traits, Allocator> str() &&;  // (3) (desde C++20)
void str( const std::basic_string<CharT, Traits, Allocator>& s );  // (4)
template<class SAlloc>
void str( const std::basic_string<CharT, Traits, SAlloc>& s );  // (5) (desde C++20)
void str( std::basic_string<CharT, Traits, Allocator>&& s );  // (6) (desde C++20)
template< class StringViewLike >
void str( const StringViewLike& t );  // (7) (desde C++26)
```

  
Obtém e define a string subjacente.

Nas descrições abaixo, buf e mode são [membros de dados apenas para exposição](<#/doc/io/basic_stringbuf>) de *this.

1) Cria e retorna um objeto [std::basic_string](<#/doc/string/basic_string>) contendo uma cópia da sequência de caracteres subjacente deste `std::basic_stringbuf`. Para streams somente de entrada, a string retornada contém os caracteres do range `[`[eback()](<#/doc/io/basic_streambuf/gptr>)`, `[egptr()](<#/doc/io/basic_streambuf/gptr>)`)`. Para streams de entrada/saída ou somente de saída, contém os caracteres de [pbase()](<#/doc/io/basic_streambuf/pptr>) até o último caractere na sequência, independentemente de [egptr()](<#/doc/io/basic_streambuf/gptr>) e [epptr()](<#/doc/io/basic_streambuf/pptr>).

A sequência de caracteres membro em um buffer aberto para escrita pode ser superalocada para fins de eficiência. Nesse caso, apenas os _caracteres inicializados_ são retornados: esses caracteres são aqueles obtidos do argumento string do construtor, do argumento string da chamada mais recente para uma sobrecarga setter de `str()`, ou de uma operação de escrita. Uma implementação típica que usa superalocação mantém um ponteiro de marca d'água alta para rastrear o fim da parte inicializada do buffer e esta sobrecarga retorna os caracteres de [pbase()](<#/doc/io/basic_streambuf/pptr>) até o ponteiro de marca d'água alta.

Equivalente a return [std::basic_string](<#/doc/string/basic_string>)<CharT, Traits, Allocator>(view(), get_allocator());.
| (desde C++20)

2) O mesmo que (1), exceto que a é usado para construir o [std::basic_string](<#/doc/string/basic_string>) retornado. Equivalente a return [std::basic_string](<#/doc/string/basic_string>)<CharT, Traits, SAlloc>(view(), a);.

Esta sobrecarga participa da resolução de sobrecarga somente se `SAlloc` atender aos requisitos de [Allocator](<#/doc/named_req/Allocator>).

3) Cria um objeto [std::basic_string](<#/doc/string/basic_string>) como se fosse construído por move a partir da sequência de caracteres subjacente de *this em buf. buf pode precisar ser ajustado para conter o mesmo conteúdo que em (1) inicialmente. Depois disso, define buf como vazio e chama [`_init_buf_ptrs_()`](<#/doc/io/basic_stringbuf/init_buf_ptrs>), então retorna o objeto [std::basic_string](<#/doc/string/basic_string>).

4) Substitui a sequência de caracteres subjacente como se por buf = s, então chama [`_init_buf_ptrs_()`](<#/doc/io/basic_stringbuf/init_buf_ptrs>).

5) O mesmo que (4), exceto que o tipo do allocator de s não é `Allocator`.

Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_same_v](<#/doc/types/is_same>)<SAlloc, Allocator> for false.

6) Substitui a sequência de caracteres subjacente como se por buf = std::move(s), então chama [`_init_buf_ptrs_()`](<#/doc/io/basic_stringbuf/init_buf_ptrs>).

7) Converte implicitamente t para um string view sv como se por [std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits> sv = t;, então substitui a sequência de caracteres subjacente como se por buf = sv, então chama [`_init_buf_ptrs_()`](<#/doc/io/basic_stringbuf/init_buf_ptrs>).

Esta sobrecarga participa da resolução de sobrecarga somente se [std::is_convertible_v](<#/doc/types/is_convertible>)<const StringViewLike&,
[std::basic_string_view](<#/doc/string/basic_string_view>)<CharT, Traits>> for true.

### Parâmetros

- **s** — um objeto [std::basic_string](<#/doc/string/basic_string>) contendo a sequência de caracteres de substituição
- **t** — um objeto (convertível para [std::basic_string_view](<#/doc/string/basic_string_view>)) contendo a sequência de caracteres de substituição
- **a** — allocator a ser usado para todas as alocações de memória do [std::basic_string](<#/doc/string/basic_string>) retornado

### Valor de retorno

1-3) Um objeto [std::basic_string](<#/doc/string/basic_string>) contendo a sequência de caracteres subjacente deste buffer.

4-7) (nenhum)

### Notas

Esta função é tipicamente acessada através de [std::basic_istringstream::str()](<#/doc/io/basic_istringstream/str>), [std::basic_ostringstream::str()](<#/doc/io/basic_ostringstream/str>), ou [std::basic_stringstream::str()](<#/doc/io/basic_stringstream/str>).

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_sstream_from_string_view`](<#/doc/feature_test>) | [`202306L`](<#/>) | (C++26) | Interface de streams de string com [std::string_view](<#/doc/string/basic_string_view>)

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        int n;
     
        std::istringstream in;  // could also use in("1 2")
        in.rdbuf()->str("1 2"); // set the get area
        in >> n;
        std::cout << "after reading the first int from \"1 2\", the int is " 
                  << n << ", str() = \"" << in.rdbuf()->str() << "\"\n"; // or in.str()
     
        std::ostringstream out("1 2");
        out << 3;
        std::cout << "after writing the int '3' to output stream \"1 2\""
                  << ", str() = \"" << out.str() << "\"\n";
     
        std::ostringstream ate("1 2", std::ios_base::ate); // C++11
        ate << 3;
        std::cout << "after writing the int '3' to append stream \"1 2\""
                  << ", str() = \"" << ate.str() << "\"\n";
    }
```

Saída:
```
    after reading the first int from "1 2", the int is 1, str() = "1 2"
    after writing the int '3' to output stream "1 2", str() = "3 2"
    after writing the int '3' to append stream "1 2", str() = "1 23"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
[LWG 432](<https://cplusplus.github.io/LWG/issue432>) | C++98 | 1. a sobrecarga (1) não especificava o conteúdo
da sequência de caracteres subjacente
2. a sobrecarga (4) não especificava como as
sequências de entrada e saída são inicializadas | ambos especificados
---|---
[LWG 562](<https://cplusplus.github.io/LWG/issue562>) | C++98 | a sobrecarga (4) definia [epptr()](<#/doc/io/basic_streambuf/pptr>) para apontar um caractere além do último caractere subjacente
se bool(mode & [std::ios_base::out](<#/doc/io/ios_base/openmode>)) == true | [epptr()](<#/doc/io/basic_streambuf/pptr>) pode ser definido
além dessa posição

### Ver também

[ str](<#/doc/io/basic_stringstream/str>) | obtém ou define o conteúdo do objeto de dispositivo de string subjacente
(função membro pública de `std::basic_stringstream<CharT,Traits,Allocator>`)
[ view](<#/doc/io/basic_stringbuf/view>)(C++20) | obtém uma view sobre a sequência de caracteres subjacente
(função membro pública)