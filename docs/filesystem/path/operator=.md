# std::filesystem::path::operator=

```cpp
path& operator=( const path& p );  // (1) (desde C++17)
path& operator=( path&& p ) noexcept;  // (2) (desde C++17)
path& operator=( string_type&& source );  // (3) (desde C++17)
template< class Source >
path& operator=( const Source& source );  // (4) (desde C++17)
```

  
1) Substitui o conteúdo de *this por um nome de caminho cujas representações de formato nativo e genérico são iguais às de p.

2) Substitui o conteúdo de *this por um nome de caminho cujas representações de formato nativo e genérico são iguais às de p, possivelmente usando move semantics: p é deixado em um estado válido, mas não especificado.

3) Substitui o conteúdo de *this por um novo valor de path construído a partir de source de formato detectado, que é deixado em um estado válido, mas não especificado. Equivalente a assign(std::move(source)).

4) Substitui o conteúdo de *this por um novo valor de path construído a partir de source de formato detectado como se pela sobrecarga (4) do [construtor de path](<#/doc/filesystem/path/path>). Equivalente a assign(source).

(4) participa da resolução de sobrecarga apenas se `Source` e `path` não forem do mesmo tipo, e se: 

  * `Source` for uma especialização de [std::basic_string](<#/doc/string/basic_string>) ou [std::basic_string_view](<#/doc/string/basic_string_view>), ou 
  * [std::iterator_traits](<#/doc/iterator/iterator_traits>)<[std::decay_t](<#/doc/types/decay>)&lt;Source&gt;>::value_type for válido e denotar um tipo de caractere de codificação possivelmente qualificado com const (char, char8_t, (desde C++20)char16_t, char32_t, ou wchar_t). 

### Parâmetros

p  |  \-  |  um path para atribuir   
---|---|---
source  |  \-  |  um [std::basic_string](<#/doc/string/basic_string>), [std::basic_string_view](<#/doc/string/basic_string_view>), ponteiro para uma string de caractere/caractere largo terminada em nulo, ou um input iterator que aponta para uma sequência de caractere/caractere largo terminada em nulo. O tipo de caractere deve ser um de char, char8_t, (desde C++20)char16_t, char32_t, wchar_t  
  
### Valor de retorno

*this

### Exemplo

Execute este código
```cpp 
    #include <filesystem>
    namespace fs = std::filesystem;
    
    int main()
    {
        fs::path p = "C:/users/abcdef/AppData/Local";
        p = p / "Temp"; // atribuição por move
        const wchar_t* wstr = L"D:/猫.txt";
        p = wstr; // atribuição a partir de uma source
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 3244](<https://cplusplus.github.io/LWG/issue3244>) | C++17  | restrição de que `Source` não pode ser `path` estava faltando  | adicionado   
  
### Veja também

[ assign](<#/doc/filesystem/path/assign>) | atribui conteúdo   
(função membro pública)  
[ (constructor)](<#/doc/filesystem/path/path>) | constrói um `path`   
(função membro pública)