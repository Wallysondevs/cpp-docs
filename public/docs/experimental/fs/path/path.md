# std::experimental::filesystem::path::path

path(); | (1) | (filesystem TS)
---|---|---
path( const path& p ); | (2) | (filesystem TS)
path( path&& p ); | (3) | (filesystem TS)
template< class Source >
path( const Source& source ); | (4) | (filesystem TS)
template< class InputIt >
path( InputIt first, InputIt last ); | (5) | (filesystem TS)
template< class Source >
path( const Source& source, const [std::locale](<#/doc/locale/locale>)& loc ); | (6) | (filesystem TS)
template< class InputIt >
path( InputIt first, InputIt last, const [std::locale](<#/doc/locale/locale>)& loc ); | (7) | (filesystem TS)

Constrói um novo objeto `path`.

1) Constrói um path vazio.

2) Construtor de cópia. Constrói uma cópia de p.

3) Construtor de movimento (move constructor). Constrói uma cópia de p, p é deixado em um estado válido, mas não especificado.

4,5) Constrói o path a partir de uma sequência de caracteres fornecida por source (4), que é um ponteiro ou um input iterator para uma sequência de caracteres/wide characters terminada em nulo ou um [std::basic_string](<#/doc/string/basic_string>), ou representada como um par de input iterators [first, last) (5). Qualquer um dos quatro tipos de caracteres char, char16_t, char32_t, wchar_t é permitido, e o método de conversão para o conjunto de caracteres nativo depende do tipo de caractere usado por source.

  * Se o tipo de caractere da source for char, a codificação da source é assumida como sendo a codificação narrow nativa (portanto, nenhuma conversão ocorre em sistemas POSIX).
  * Se o tipo de caractere da source for char16_t, a conversão de UTF-16 para a codificação nativa do filesystem é usada.
  * Se o tipo de caractere da source for char32_t, a conversão de UTF-32 para a codificação nativa do filesystem é usada.
  * Se o tipo de caractere da source for wchar_t, a entrada é assumida como sendo a codificação wide nativa (portanto, nenhuma conversão ocorre no Windows).

6,7) Constrói o path a partir de uma sequência de caracteres fornecida por source (6), que é um ponteiro ou um input iterator para uma sequência de caracteres terminada em nulo ou um [std::string](<#/doc/string/basic_string>), ou representada como um par de input iterators [first, last) (7). O único tipo de caractere permitido é char. Usa loc para realizar a conversão de codificação de caracteres. Se `value_type` for wchar_t, converte para wide usando a facet [std::codecvt](<#/doc/locale/codecvt>)<wchar_t, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> de loc. Caso contrário, primeiro converte para wide usando a facet [std::codecvt](<#/doc/locale/codecvt>)<wchar_t, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> e então converte para o tipo de caractere nativo do filesystem usando a facet [std::codecvt](<#/doc/locale/codecvt>)<wchar_t, value_type> de loc.

### Parâmetros

- **p** — um path para copiar
- **source** — um [std::basic_string](<#/doc/string/basic_string>), ponteiro para uma string de caracteres terminada em nulo, ou um input iterator com um tipo de valor de caractere que aponta para uma sequência de caracteres terminada em nulo (o tipo de caractere deve ser char para a sobrecarga (6)
- **first, last** — par de [LegacyInputIterators](<#/doc/named_req/InputIterator>) que especificam uma sequência de caracteres codificada em UTF-8
- **loc** — locale que define a conversão de codificação a ser usada
Requisitos de tipo
-`InputIt` deve atender aos requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-O tipo de valor de `InputIt` deve ser um dos quatro tipos de caracteres char, wchar_t, char16_t e char32_t para usar a sobrecarga (5).
-O tipo de valor de `InputIt` deve ser char para usar a sobrecarga (7).

### Exceções

1,2) (nenhuma)

3)

Especificação [`noexcept`](<#/doc/language/noexcept_spec>):

noexcept

4-7) (nenhuma)

### Notas

Para geração portátil de nomes de path a partir de strings Unicode, veja [u8path](<#/doc/experimental/fs/path/u8path>).

### Exemplo

Execute este código
```cpp
    #include <experimental/filesystem>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        fs::path p1 = "/usr/lib/sendmail.cf"; // portable format
        fs::path p2 = "C:\\users\\abcdef\\AppData\\Local\\Temp\\"; // native format
        fs::path p3 = L"D:/猫.txt"; // wide string
    
        std::cout << "p1 = " << p1 << '\n'
                  << "p2 = " << p2 << '\n'
                  << "p3 = " << p3 << '\n';
    }
```

Saída:
```
    p1 = "/usr/lib/sendmail.cf"
    p2 = "C:\users\abcdef\AppData\Local\Temp\"
    p3 = "D:/猫.txt"
```

### Veja também

[ u8path](<#/doc/experimental/fs/path/u8path>) | cria um `path` a partir de uma source codificada em UTF-8
(função)