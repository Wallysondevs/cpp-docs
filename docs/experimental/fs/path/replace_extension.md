# std::experimental::filesystem::path::replace_extension

path& replace_extension( const path& replacement = path() ); | (1) | (filesystem TS)

Substitui a extensão por `replacement` ou a remove quando o valor padrão de `replacement` é usado.

Primeiramente, se este path tiver uma [`extension()`](<#/doc/experimental/fs/path/extension>), ela é removida.

Em seguida, um caractere de ponto é anexado se `replacement` não estiver vazio ou não começar com um caractere de ponto.

Então `replacement` é anexado ao path.

### Parâmetros

- **replacement** — a extensão para substituir

### Valor de retorno

*this

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
        fs::path p = "/foo/bar.jpeg";
        std::cout << "Was: " << p << '\n';
        p.replace_extension(".jpg");
        std::cout << "Now: " << p << '\n';
    }
```

Saída:
```
    Was: "/foo/bar.jpeg"
    Now: "/foo/bar.jpg"
```

### Veja também

[ extension](<#/doc/experimental/fs/path/extension>) | retorna o componente de path da extensão do arquivo
(função membro pública)
[ filename](<#/doc/experimental/fs/path/filename>) | retorna o componente de path do nome do arquivo
(função membro pública)
[ stem](<#/doc/experimental/fs/path/stem>) | retorna o componente de path do stem
(função membro pública)
[ has_extension](<#/doc/experimental/fs/path/has_path>) | verifica se o elemento de path correspondente não está vazio
(função membro pública)