# std::filesystem::path::stem

path stem() const; | | (desde C++17)

Retorna o nome do arquivo identificado pelo path em formato genérico, sem sua extensão.

Retorna a substring do início de [`filename()`](<#/doc/filesystem/path/filename>) até, mas não incluindo, o último caractere de ponto (`.`), com as seguintes exceções:

*   Se o primeiro caractere no nome do arquivo for um ponto, esse ponto é ignorado (um nome de arquivo como ".profile" não é tratado como uma extensão).
*   Se o nome do arquivo for um dos componentes especiais do filesystem, "dot" ou "dot-dot", ou se não tiver pontos, a função retorna o [`filename()`](<#/doc/filesystem/path/filename>) inteiro.

### Parâmetros

(nenhum)

### Valor de retorno

O stem do nome do arquivo identificado pelo path (ou seja, o nome do arquivo sem a extensão final).

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
        for (const fs::path p : {"/foo/bar.txt", "/foo/.bar", "foo.bar.baz.tar"})
            std::cout << "path: " << p << ", stem: " << p.stem() << '\n';
    
        std::cout << '\n';
    
        for (fs::path p = "foo.bar.baz.tar"; !p.extension().empty(); p = p.stem())
            std::cout << "path: " << p << ", extension: " << p.extension() << '\n';
    }
```

Saída:
```
    path: "/foo/bar.txt", stem: "bar"
    path: "/foo/.bar", stem: ".bar"
    path: "foo.bar.baz.tar", stem: "foo.bar.baz"
    
    path: "foo.bar.baz.tar", extension: ".tar"
    path: "foo.bar.baz", extension: ".baz"
    path: "foo.bar", extension: ".bar"
```

### Veja também

[ filename](<#/doc/filesystem/path/filename>) | retorna o componente de nome de arquivo do path
(função membro pública)
[ extension](<#/doc/filesystem/path/extension>) | retorna o componente de extensão de arquivo do path
(função membro pública)