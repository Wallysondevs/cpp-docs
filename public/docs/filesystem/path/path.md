# std::filesystem::path::path

```cpp
path() noexcept;  // (1) (desde C++17)
path( const path& p );  // (2) (desde C++17)
path( path&& p ) noexcept;  // (3) (desde C++17)
path( string_type&& source, format fmt = auto_format );  // (4) (desde C++17)
template< class Source >
path( const Source& source, format fmt = auto_format );  // (5) (desde C++17)
template< class InputIt >
path( InputIt first, InputIt last, format fmt = auto_format );  // (6) (desde C++17)
template< class Source >
path( const Source& source, const std::locale& loc, format fmt = auto_format );  // (7) (desde C++17)
template< class InputIt >
path( InputIt first, InputIt last, const std::locale& loc, format fmt = auto_format );  // (8) (desde C++17)
```

Constrói um novo objeto `path`.

1) Constrói um path vazio.

2) Construtor de cópia. Constrói um path cujo nome de caminho (pathname), tanto em formato nativo quanto genérico, é o mesmo de p.

3) Construtor de movimento (move constructor). Constrói um path cujo nome de caminho (pathname), tanto em formato nativo quanto genérico, é o mesmo de p; p é deixado em um estado válido, mas não especificado.

4-6) Constrói o path a partir de uma sequência de caracteres (formato interpretado conforme especificado por fmt) fornecida por source (4,5), que é um ponteiro ou um input iterator para uma sequência de caracteres/caracteres largos terminada em nulo, um [std::basic_string](<#/doc/string/basic_string>) ou um [std::basic_string_view](<#/doc/string/basic_string_view>), ou representada como um par de input iterators [first, last) (6). Qualquer um dos tipos de caractere char, char8_t, (desde C++20)char16_t, char32_t, wchar_t é permitido, e o método de conversão para o conjunto de caracteres nativo depende do tipo de caractere usado por source.

* Se o tipo de caractere da source for char, a codificação da source é assumida como sendo a codificação narrow nativa (portanto, nenhuma conversão ocorre em sistemas POSIX).

* Se o tipo de caractere da source for char8_t, a conversão de UTF-8 para a codificação nativa do filesystem é usada.

| (desde C++20)

* Se o tipo de caractere da source for char16_t, a conversão de UTF-16 para a codificação nativa do filesystem é usada.
* Se o tipo de caractere da source for char32_t, a conversão de UTF-32 para a codificação nativa do filesystem é usada.
* Se o tipo de caractere da source for wchar_t, a entrada é assumida como sendo a codificação wide nativa (portanto, nenhuma conversão ocorre no Windows).

7,8) Constrói o path a partir de uma sequência de caracteres (formato interpretado conforme especificado por fmt) fornecida por source (7), que é um ponteiro ou um input iterator para uma sequência de caracteres terminada em nulo, um [std::string](<#/doc/string/basic_string>), um [std::string_view](<#/doc/string/basic_string_view>), ou representada como um par de input iterators [first, last) (8). O único tipo de caractere permitido é char. Usa loc para realizar a conversão de codificação de caracteres. Se `value_type` for wchar_t, converte para wide usando a facet [std::codecvt](<#/doc/locale/codecvt>)<wchar_t, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> de loc. Caso contrário, primeiro converte para wide usando a facet [std::codecvt](<#/doc/locale/codecvt>)<wchar_t, char, [std::mbstate_t](<#/doc/string/multibyte/mbstate_t>)> e então converte para o tipo de caractere nativo do filesystem usando a facet [std::codecvt](<#/doc/locale/codecvt>)<wchar_t,value_type> de loc.

(5) e (7) participam da resolução de sobrecarga (overload resolution) apenas se `Source` e `path` não forem do mesmo tipo, e se:

* `Source` for uma especialização de [std::basic_string](<#/doc/string/basic_string>) ou [std::basic_string_view](<#/doc/string/basic_string_view>), ou
* [std::iterator_traits](<#/doc/iterator/iterator_traits>)<[std::decay_t](<#/doc/types/decay>)&lt;Source&gt;>::value_type for válido e denotar um tipo de caractere de codificação possivelmente qualificado com const (char, char8_t, (desde C++20)char16_t, char32_t, ou wchar_t).

### Parâmetros

- **p** — um path para copiar
- **source** — [std::basic_string](<#/doc/string/basic_string>), [std::basic_string_view](<#/doc/string/basic_string_view>), ponteiro para uma string de caracteres terminada em nulo, ou input iterator com um tipo de valor de caractere que aponta para uma sequência de caracteres terminada em nulo (o tipo de caractere deve ser char para a sobrecarga (7))
- **first, last** — par de [LegacyInputIterators](<#/doc/named_req/InputIterator>) que especificam uma sequência de caracteres
- **fmt** — enumerador do tipo [`path::format`](<#/doc/filesystem/path/format>) que especifica como o formato do nome de caminho (pathname) deve ser interpretado
- **loc** — locale que define a conversão de codificação a ser usada
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-O tipo de valor de `InputIt` deve ser um dos tipos de caractere char, wchar_t, char8_t, (desde C++20)char16_t e char32_t para usar a sobrecarga (6).
-O tipo de valor de `InputIt` deve ser char para usar a sobrecarga (8).

### Exceções

2,4-8) Pode lançar exceções definidas pela implementação.

### Notas

Para geração portátil de nomes de caminho (pathname) a partir de strings Unicode, veja [`u8path`](<#/doc/filesystem/path/u8path>). | (até C++20)
---|---
O construtor de `path` suporta a criação a partir de uma string UTF-8 quando a source é uma sequência de char8_t. | (desde C++20)

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <iostream>
    namespace fs = std::filesystem;
    
    int main()
    {
        fs::path p1 = "/usr/lib/sendmail.cf"; // portable format
        fs::path p2 = "C:\\users\\abcdef\\AppData\\Local\\Temp\\"; // native format
        fs::path p3 = U"D:/猫.txt"; // UTF-32 string
        fs::path p4 = u8"~/狗.txt"; // UTF-8 string
    
        std::cout << "p1 = " << p1 << '\n'
                  << "p2 = " << p2 << '\n'
                  << "p3 = " << p3 << '\n'
                  << "p4 = " << p4 << '\n';
    }
```

Saída:
```
    p1 = "/usr/lib/sendmail.cf"
    p2 = "C:\\users\\abcdef\\AppData\\Local\\Temp\\"
    p3 = "D:/猫.txt"
    p4 = "~/狗.txt"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3244](<https://cplusplus.github.io/LWG/issue3244>) | C++17 | restrição de que `Source` não pode ser `path` estava faltando | adicionado

### Veja também

[ u8path](<#/doc/filesystem/path/u8path>)(C++17)(obsoleto desde C++20) | cria um `path` a partir de uma source codificada em UTF-8
(função)