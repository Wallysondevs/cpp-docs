# std::filesystem::path::append, std::filesystem::path::operator/=

```cpp
path& operator/=( const path& p );  // (1) (desde C++17)
template< class Source >
path& operator/=( const Source& source );  // (2) (desde C++17)
template< class Source >
path& append( const Source& source );  // (3) (desde C++17)
template< class InputIt >
path& append( InputIt first, InputIt last );  // (4) (desde C++17)
```

1) Se p.is_absolute() || (p.has_root_name() && p.root_name() != root_name()), então substitui o path atual por p como se fosse por operator=(p) e finaliza.

* Caso contrário, se p.has_root_directory(), então remove qualquer diretório raiz e o path relativo inteiro do pathname de formato genérico de *this.

* Caso contrário, se has_filename() || (!has_root_directory() && is_absolute()), então anexa `path::preferred_separator` ao formato genérico de *this.

* De qualquer forma, então anexa o pathname de formato nativo de p, omitindo qualquer root-name de seu formato genérico, ao formato nativo de *this.
```cpp
    // Onde "//host" é um root-name
    path("//host")  / "foo" // o resultado é      "//host/foo" (anexa com separador)
    path("//host/") / "foo" // o resultado também é "//host/foo" (anexa sem separador)
    
    // Em POSIX,
    path("foo") / ""      // o resultado é "foo/" (anexa)
    path("foo") / "/bar"; // o resultado é "/bar" (substitui)
    
    // Em Windows,
    path("foo") / "C:/bar";  // o resultado é "C:/bar" (substitui)
    path("foo") / "C:";      // o resultado é "C:"     (substitui)
    path("C:") / "";         // o resultado é "C:"     (anexa, sem separador)
    path("C:foo") / "/bar";  // resulta em "C:/bar"        (remove path relativo, então anexa)
    path("C:foo") / "C:bar"; // resulta em "C:foo/bar"     (anexa, omitindo o root-name de p)
```

2,3) O mesmo que (1), mas aceita qualquer [std::basic_string](<#/doc/string/basic_string>), [std::basic_string_view](<#/doc/string/basic_string_view>), string multicaractere terminada em nulo, ou um input iterator apontando para uma sequência multicaractere terminada em nulo. Equivalente a return operator/=(path(source));.

4) O mesmo que (1), mas aceita qualquer par de iterators que designa uma string multicaractere. Equivalente a return operator/=(path(first, last));.

(2) e (3) participam da resolução de sobrecarga somente se `Source` e `path` não forem do mesmo tipo, e qualquer um dos seguintes:

* `Source` é uma especialização de [std::basic_string](<#/doc/string/basic_string>) ou [std::basic_string_view](<#/doc/string/basic_string_view>), ou
* [std::iterator_traits](<#/doc/iterator/iterator_traits>)<[std::decay_t](<#/doc/types/decay>)&lt;Source&gt;>::value_type é válido e denota um tipo de caractere de codificação possivelmente qualificado com const (char, char8_t, (desde C++20)char16_t, char32_t, ou wchar_t).

### Parâmetros

- **p** — pathname a anexar
- **source** — [std::basic_string](<#/doc/string/basic_string>), [std::basic_string_view](<#/doc/string/basic_string_view>), string multicaractere terminada em nulo, ou um input iterator apontando para uma sequência multicaractere terminada em nulo, que representa um nome de path (tanto em formato portátil quanto nativo)
- **first, last** — par de [LegacyInputIterators](<#/doc/named_req/InputIterator>) que especificam uma sequência multicaractere que representa um nome de path
Requisitos de tipo
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).
-O tipo de valor de `InputIt` deve ser um dos tipos de caractere codificados (char, wchar_t, char16_t e char32_t).

### Valor de retorno

*this

### Exceções

Pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.

### Notas

Essas funções efetivamente produzem uma aproximação do significado do path de argumento p em um ambiente onde *this é o diretório inicial.

### Exemplo

A saída é produzida no Windows.

Execute este código
```cpp
    #include <filesystem>
    #include <iostream>
    namespace fs = std::filesystem;
    
    int main()
    {
        fs::path p1 = "C:";
        p1 /= "Users"; // não insere um separador
        std::cout << "\"C:\" / \"Users\" == " << p1 << '\n';
        p1 /= "batman"; // insere fs::path::preferred_separator, '\' no Windows
        std::cout << "\"C:\" / \"Users\" / \"batman\" == " << p1 << '\n';
    }
```

Saída possível:
```
    "C:" / "Users" == "C:Users"
    "C:" / "Users" / "batman" == "C:Users\\batman"
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3244](<https://cplusplus.github.io/LWG/issue3244>) | C++17 | restrição de que `Source` não pode ser `path` estava faltando | adicionado

### Veja também

[ concatoperator+=](<#/doc/filesystem/path/concat>) | concatena dois paths sem introduzir um separador de diretório
(função membro pública)
[ operator/](<#/doc/filesystem/path/operator_slash>)(C++17) | concatena dois paths com um separador de diretório
(função)