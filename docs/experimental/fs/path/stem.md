# std::experimental::filesystem::path::stem

path stem() const; | | (filesystem TS)

Retorna o nome do arquivo identificado pelo path sem sua extensão.

Retorna a substring desde o início de [`filename()`](<#/doc/experimental/fs/path/filename>) até, mas não incluindo, o último caractere de ponto (`.`).

Se o nome do arquivo for um dos componentes especiais do sistema de arquivos 'dot' ou 'dot-dot', ou se não tiver pontos, a função retorna o [`filename()`](<#/doc/experimental/fs/path/filename>) completo.

### Parâmetros

(nenhum)

### Valor de retorno

O stem do nome do arquivo identificado pelo path.

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Execute este código
```cpp
    #include <experimental/filesystem>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        std::cout << fs::path("/foo/bar.txt").stem() << '\n'
                  << fs::path("/foo/.bar").stem() << '\n';
    
        for (fs::path p = "foo.bar.baz.tar"; !p.extension().empty(); p = p.stem())
            std::cout << p.extension() << '\n';
    }
```

Saída:
```
    "bar"
    ""
    ".tar"
    ".baz"
    ".bar"
```

### Veja também

[ filename](<#/doc/experimental/fs/path/filename>) | retorna o componente de path do nome do arquivo
(função membro pública)
[ extension](<#/doc/experimental/fs/path/extension>) | retorna o componente de path da extensão do arquivo
(função membro pública)