# std::filesystem::path::concat, std::filesystem::path::operator+=

```cpp
path& operator+=( const path& p );  // (1) (desde C++17)
path& operator+=( const string_type& str );
path& operator+=( std::basic_string_view<value_type> str );  // (2) (desde C++17)
path& operator+=( const value_type* ptr );  // (3) (desde C++17)
path& operator+=( value_type x );  // (4) (desde C++17)
template< class CharT >
path& operator+=( CharT x );  // (5) (desde C++17)
template< class Source >
path& operator+=( const Source& source );  // (6) (desde C++17)
template< class Source >
path& concat( const Source& source );  // (7) (desde C++17)
template< class InputIt >
path& concat( InputIt first, InputIt last );  // (8) (desde C++17)
```

Concatena o caminho atual e o argumento

1-3,6,7) Anexa path(p).native() ao nome do caminho armazenado em *this no formato nativo. Isso manipula diretamente o valor de native() e pode não ser portável entre sistemas operacionais.

4,5) O mesmo que return *this += [std::basic_string_view](<#/doc/string/basic_string_view>)(&x, 1);.

8) O mesmo que return *this += path(first, last);.

(6) e (7) participam da resolução de sobrecarga somente se `Source` e `path` não forem do mesmo tipo, e se uma das seguintes condições for verdadeira:

*   `Source` é uma especialização de [std::basic_string](<#/doc/string/basic_string>) ou [std::basic_string_view](<#/doc/string/basic_string_view>), ou
*   [std::iterator_traits](<#/doc/iterator/iterator_traits>)<[std::decay_t](<#/doc/types/decay>)&lt;Source&gt;>::value_type é válido e denota um tipo de caractere de codificação possivelmente qualificado com const (char, char8_t, (desde C++20)char16_t, char32_t, ou wchar_t).

### Parâmetros

- **p** — caminho a ser anexado
- **str** — string ou string view a ser anexada
- **ptr** — ponteiro para o início de uma string terminada em nulo a ser anexada
- **x** — caractere único a ser anexado
- **source** — [std::basic_string](<#/doc/string/basic_string>), [std::basic_string_view](<#/doc/string/basic_string_view>), string multicaractere terminada em nulo, ou um iterator de entrada apontando para uma sequência multicaractere terminada em nulo, que representa um nome de caminho (tanto em formato portátil quanto nativo)
- **first, last** — par de [LegacyInputIterators](<#/doc/named_req/InputIterator>) que especificam uma sequência multicaractere que representa um nome de caminho
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-O tipo de valor de `InputIt` deve ser um dos tipos de caractere codificados (char, wchar_t, char16_t e char32_t).
-`CharT` deve ser um dos tipos de caractere codificados (char, wchar_t, char16_t e char32_t).

### Valor de retorno

*this

### Exceções

Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

### Observações

Ao contrário de [append()](<#/doc/filesystem/path/append>) ou [operator/=](<#/doc/filesystem/path/append>), separadores de diretório adicionais nunca são introduzidos.

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <iostream>
    #include <string>
     
    int main()
    {
        std::filesystem::path p1; // an empty path
        p1 += "var"; // does not insert a separator
        std::cout << R"("" + "var" --> )" << p1 << '\n';
        p1 += "lib"; // does not insert a separator
        std::cout << R"("var" + "lib" --> )" << p1 << '\n';
        auto str = std::string{"1234567"};
        p1.concat(std::begin(str) + 3, std::end(str) - 1);
        std::cout << "p1.concat --> " << p1 << '\n';
    }
```

Saída:
```
    "" + "var" --> "var"
    "var" + "lib" --> "varlib"
    p1.concat --> "varlib456"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3055](<https://cplusplus.github.io/LWG/issue3055>) | C++17 | a especificação de concatenação de um único caractere estava malformada | tornada bem-formada
[LWG 3244](<https://cplusplus.github.io/LWG/issue3244>) | C++17 | a restrição de que `Source` não pode ser `path` estava faltando | adicionada

### Ver também

[ appendoperator/=](<#/doc/filesystem/path/append>) | anexa elementos ao caminho com um separador de diretório
(função membro pública)
[ operator/](<#/doc/filesystem/path/operator_slash>)(C++17) | concatena dois caminhos com um separador de diretório
(função)