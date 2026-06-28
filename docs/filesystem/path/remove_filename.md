# std::filesystem::path::remove_filename

```cpp
path& remove_filename();  // (desde C++17)
```

  
Remove um único componente de nome de arquivo em formato genérico (conforme retornado por [`filename`](<#/doc/filesystem/path/filename>)) do path em formato genérico fornecido.

Após a conclusão desta função, [`has_filename`](<#/doc/filesystem/path/has_path>) retorna false.

### Parâmetros

(nenhum)

### Valor de retorno

*this

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <iostream>
    namespace fs = std::filesystem;
    
    int main()
    {
        fs::path p;
        std::cout << std::boolalpha
                  << (p = "foo/bar").remove_filename() << '\t' << p.has_filename() << '\n'
                  << (p = "foo/").remove_filename() << '\t' << p.has_filename() << '\n'
                  << (p = "/foo").remove_filename() << '\t' << p.has_filename() << '\n'
                  << (p = "/").remove_filename() << '\t' << p.has_filename() << '\n'
                  << (p = "").remove_filename() << '\t' << p.has_filename() << '\n';
    }
```

Saída:
```
    "foo/"  false
    "foo/"  false
    "/"     false
    "/"     false
    ""      false
```

### Veja também

[ filename](<#/doc/filesystem/path/filename>) | retorna o componente de nome de arquivo do path   
(função membro pública)  
[ replace_filename](<#/doc/filesystem/path/replace_filename>) | substitui o último componente do path por outro path   
(função membro pública)  
[ has_filename](<#/doc/filesystem/path/has_path>) | verifica se o elemento do path correspondente não está vazio   
(função membro pública)