# std::experimental::filesystem::path::operator=

path& operator=( const path& p ); |  (1)  |  (filesystem TS)  
---|---|---
path& operator=( path&& p ); |  (2)  |  (filesystem TS)  
template< class Source >  
path& operator=( const Source& source ); |  (3)  |  (filesystem TS)  

  
1) Substitui o conteúdo de *this por uma cópia do conteúdo de p.

2) Substitui o conteúdo de *this por p, possivelmente usando move semantics: p é deixado em um estado válido, mas não especificado.

3) Substitui o conteúdo de *this por um novo valor de path construído a partir de source como se fosse pela sobrecarga (4) do [construtor de path](<#/doc/experimental/fs/path/path>). Equivalente a assign(source).

### Parâmetros

p  |  \-  |  um path para atribuir   
---|---|---
source  |  \-  |  um [std::basic_string](<#/doc/string/basic_string>), ponteiro para uma string de caracteres/wide characters terminada em nulo, ou um input iterator que aponta para uma sequência de caracteres/wide characters terminada em nulo. O tipo de caractere deve ser um de char, char16_t, char32_t, wchar_t  
  
### Valor de retorno

*this

### Exceções

1) (nenhuma)

2)

[`noexcept`](<#/doc/language/noexcept_spec>) especificação: 

noexcept

3) (nenhuma)

### Exemplo

Execute este código
```
    #include <experimental/filesystem>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        fs::path p = "C:/users/abcdef/AppData/Local";
        p = p / "Temp"; // move assignment
        const wchar_t* wstr = L"D:/猫.txt";
        p = wstr; // assignment from a source
    }
```

### Veja também

[ assign](<#/doc/experimental/fs/path/assign>) |  atribui conteúdo   
(função membro pública)  
[ (construtor)](<#/doc/experimental/fs/path/path>) |  constrói um `path`   
(função membro pública)