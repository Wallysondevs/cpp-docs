# operator&lt;&lt;(std::basic_ostream)

Definido no cabeçalho `[<ostream>](<#/doc/header/ostream>)`

```c
basic_ostream e caractere
template< class CharT, class Traits >
basic_ostream<CharT, Traits>&
operator<<( basic_ostream<CharT, Traits>& os, CharT ch );
template< class CharT, class Traits >
basic_ostream<CharT, Traits>&
operator<<( basic_ostream<CharT, Traits>& os, char ch );
template< class Traits >
basic_ostream<char, Traits>&
operator<<( basic_ostream<char, Traits>& os, char ch );
template< class Traits >
basic_ostream<char, Traits>&
operator<<( basic_ostream<char, Traits>& os, signed char ch );
template< class Traits >
basic_ostream<char, Traits>&
operator<<( basic_ostream<char, Traits>& os, unsigned char ch );
basic_ostream e array de caracteres
template< class CharT, class Traits >
basic_ostream<CharT, Traits>&
operator<<( basic_ostream<CharT, Traits>& os, const CharT* s );
template< class CharT, class Traits >
basic_ostream<CharT, Traits>&
operator<<( basic_ostream<CharT, Traits>& os, const char* s );
template< class Traits >
basic_ostream<char, Traits>&
operator<<( basic_ostream<char, Traits>& os, const char* s );
template< class Traits >
basic_ostream<char, Traits>&
operator<<( basic_ostream<char, Traits>& os, const signed char* s );
template< class Traits >
basic_ostream<char, Traits>&
operator<<( basic_ostream<char, Traits>& os, const unsigned char* s );
rvalue de basic_ostream
template< class Ostream, class T >
Ostream&& operator<<( Ostream&& os, const T& value );
sobrecargas deletadas para basic_ostream e caractere/array UTF
template< class Traits >
basic_ostream<char, Traits>&
operator<<( basic_ostream<char, Traits>& os, wchar_t ch ) = delete;
template< class Traits >
basic_ostream<char, Traits>&
operator<<( basic_ostream<char, Traits>& os, char8_t ch ) = delete;
template< class Traits >
basic_ostream<char, Traits>&
operator<<( basic_ostream<char, Traits>& os, char16_t ch ) = delete;
template< class Traits >
basic_ostream<char, Traits>&
operator<<( basic_ostream<char, Traits>& os, char32_t ch ) = delete;
template< class Traits >
basic_ostream<wchar_t, Traits>&
operator<<( basic_ostream<wchar_t, Traits>& os, char8_t ch ) = delete;
template< class Traits >
basic_ostream<wchar_t, Traits>&
operator<<( basic_ostream<wchar_t, Traits>& os, char16_t ch ) = delete;
template< class Traits >
basic_ostream<wchar_t, Traits>&
operator<<( basic_ostream<wchar_t, Traits>& os, char32_t ch ) = delete;
template< class Traits >
basic_ostream<char, Traits>&
operator<<( basic_ostream<char, Traits>& os, const wchar_t* s ) = delete;
template< class Traits >
basic_ostream<char, Traits>&
operator<<( basic_ostream<char, Traits>& os, const char8_t* s ) = delete;
template< class Traits >
basic_ostream<char, Traits>&
operator<<( basic_ostream<char, Traits>& os, const char16_t* s ) = delete;
template< class Traits >
basic_ostream<char, Traits>&
operator<<( basic_ostream<char, Traits>& os, const char32_t* s ) = delete;
template< class Traits >
basic_ostream<wchar_t, Traits>&
operator<<( basic_ostream<wchar_t, Traits>& os, const char8_t* s ) = delete;
template< class Traits >
basic_ostream<wchar_t, Traits>&
operator<<( basic_ostream<wchar_t, Traits>& os, const char16_t* s ) = delete;
template< class Traits >
basic_ostream<wchar_t, Traits>&
operator<<( basic_ostream<wchar_t, Traits>& os, const char32_t* s ) = delete;
```

Insere um caractere ou uma string de caracteres.

1) Comporta-se como uma [FormattedOutputFunction](<#/doc/named_req/FormattedOutputFunction>). Após construir e verificar o objeto [sentry](<#/doc/io/basic_ostream/sentry>), insere o caractere ch. Se ch tiver o tipo char e o [tipo de contêiner de caractere](<#/doc/string>) de os não for char, os.widen(ch) será inserido em vez disso.

O preenchimento é determinado da seguinte forma:

*   Se os.width() > 1, então os.width() - 1 cópias de os.fill() são adicionadas ao caractere de saída para formar a sequência de caracteres de saída.
*   Se (out.flags() & [std::ios_base::adjustfield](<#/doc/io/ios_base/fmtflags>)) == [std::ios_base::left](<#/doc/io/ios_base/fmtflags>), os caracteres de preenchimento são colocados após o caractere de saída, caso contrário, antes.

Após a inserção, os.width(0) é chamado para cancelar os efeitos de [std::setw](<#/doc/io/manip/setw>), se houver.

2) Comporta-se como uma [FormattedOutputFunction](<#/doc/named_req/FormattedOutputFunction>). Após construir e verificar o objeto sentry, insere caracteres sucessivos do array de caracteres cujo primeiro elemento é apontado por s.

*   Para as primeira e terceira sobrecargas (onde `CharT` corresponde ao tipo de ch), exatamente traits::length(s) caracteres são inseridos.
*   Para a segunda sobrecarga, exatamente [std::char_traits](<#/doc/string/char_traits>)&lt;char&gt;::length(s) caracteres são inseridos.
*   Para as duas últimas sobrecargas, exatamente traits::length(reinterpret_cast&lt;const char*&gt;(s)) são inseridos.

Antes da inserção, primeiro, todos os caracteres são expandidos usando os.widen(), então o preenchimento é determinado da seguinte forma:

*   Se o número de caracteres a inserir for menor que os.width(), então cópias suficientes de os.fill() são adicionadas à sequência de caracteres para tornar seu comprimento igual a os.width().
*   Se (out.flags() & [std::ios_base::adjustfield](<#/doc/io/ios_base/fmtflags>)) == [std::ios_base::left](<#/doc/io/ios_base/fmtflags>), os caracteres de preenchimento são adicionados ao final da sequência de saída, caso contrário, são adicionados antes da sequência de saída.

Após a inserção, os.width(0) é chamado para cancelar os efeitos de [std::setw](<#/doc/io/manip/setw>), se houver.

Se s for um ponteiro nulo, o comportamento é indefinido.

3) Chama o operador de inserção apropriado, dada uma referência rvalue a um objeto de stream de saída (equivalente a os << value). Esta sobrecarga participa da resolução de sobrecarga apenas se a expressão os << value for bem-formada e `Ostream` for um tipo de classe pública e inequivocamente derivado de [std::ios_base](<#/doc/io/ios_base>).

4) Sobrecargas que aceitam char16_t, char32_t etc (ou sequência terminada em nulo destes) são deletadas: [std::cout](<#/doc/io/cout>) << u'X' não é permitido. Anteriormente, estas imprimiam um valor inteiro ou de ponteiro.

### Parâmetros

- **os** — stream de saída para inserir dados
- **ch** — referência a um caractere para inserir
- **s** — ponteiro para uma string de caracteres para inserir

### Valor de retorno

1,2) os

3) std::move(os)

### Notas

Antes do [LWG issue 1203](<https://cplusplus.github.io/LWG/issue1203>), código como ([std::ostringstream](<#/doc/io/basic_ostringstream>)() << 1.2).str() não compilava.

### Exemplo

Execute este código
```cpp
    #include <fstream>
    #include <iostream>
    
    void foo()
    {
        // error: operator<< (basic_ostream<char, _Traits>&, char8_t) is deleted
    //  std::cout << u8'z' << '\n';
    }
    
    std::ostream& operator<<(std::ostream& os, char8_t const& ch)
    {
        return os << static_cast<char>(ch);
    }
    
    int main()
    {
        std::cout << "Hello, world" // uses `const char*` overload
                  << '\n';          // uses `char` overload
        std::ofstream{"test.txt"} << 1.2; // uses rvalue overload
    
        std::cout << u8'!' << '\n'; // uses program-defined operator<<(os, char8_t const&)
    }
```

Saída:
```
    Hello, world
    !
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
[LWG 167](<https://cplusplus.github.io/LWG/issue167>) | C++98 | o número de caracteres inseridos para todas as
sobrecargas em (2) era traits::length(s) | atualizou os números para as sobrecargas
onde `CharT` não corresponde ao tipo de ch
[LWG 1203](<https://cplusplus.github.io/LWG/issue1203>) | C++11 | sobrecarga para stream rvalue retornava
referência lvalue para a classe base | retorna referência rvalue
para a classe derivada
[LWG 2011](<https://cplusplus.github.io/LWG/issue2011>) | C++98 | o preenchimento era determinado por [std::num_put::do_put()](<#/doc/locale/num_put/put>) | determinado pelo próprio operador
---|---|---|---
[LWG 2534](<https://cplusplus.github.io/LWG/issue2534>) | C++11 | sobrecarga para stream rvalue não era restrita | restrita

### Ver também

[ operator<<](<#/doc/io/basic_ostream/operator_ltlt>) | insere dados formatados
(função membro pública)
[ print(std::ostream)](<#/doc/io/basic_ostream/print>)(C++23) | produz representação [formatada](<#/doc/utility/format>) dos argumentos
(modelo de função)
[ widen](<#/doc/io/basic_ios/widen>) | expande caracteres
(função membro pública de `std::basic_ios<CharT,Traits>`)