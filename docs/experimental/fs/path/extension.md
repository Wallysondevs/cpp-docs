# std::experimental::filesystem::path::extension

path extension() const; | | (filesystem TS)

Retorna a extensão do componente de nome de arquivo do path *this.

Se o componente [`filename()`](<#/doc/experimental/fs/path/filename>) do path contiver um ponto (`.`), e não for um dos elementos especiais do filesystem dot ou dot-dot, então a _extensão_ é a substring que começa no ponto mais à direita (incluindo o ponto) e vai até o final do pathname.

Se o pathname for `.` ou `..`, ou se [`filename()`](<#/doc/experimental/fs/path/filename>) não contiver o caractere `.`, então um path vazio é retornado.

Comportamento adicional pode ser definido pelas implementações para sistemas de arquivos que anexam elementos adicionais (como alternate data streams ou nomes de partitioned dataset) às extensões.

### Parâmetros

(nenhum)

### Valor de retorno

A extensão do pathname atual ou um path vazio se não houver extensão.

### Exceções

Pode lançar exceções definidas pela implementação.

### Notas

A extensão retornada por esta função inclui um ponto para tornar possível distinguir o arquivo que termina com um ponto (a função retorna ".") de um arquivo sem extensão (a função retorna "").

Para qualquer path `p`, p.stem()+p.extension() == p.filename().

### Exemplo

Execute este código
```
    #include <experimental/filesystem>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        std::cout << fs::path("/foo/bar.txt").extension() << '\n'
                  << fs::path("/foo/bar.").extension() << '\n'
                  << fs::path("/foo/bar").extension() << '\n'
                  << fs::path("/foo/bar.txt/bar.cc").extension() << '\n'
                  << fs::path("/foo/bar.txt/bar.").extension() << '\n'
                  << fs::path("/foo/bar.txt/bar").extension() << '\n'
                  << fs::path("/foo/.").extension() << '\n'
                  << fs::path("/foo/..").extension() << '\n'
                  << fs::path("/foo/.hidden").extension() << '\n';
    }
```

Saída:
```
    ".txt"
    "."
    ""
    ".cc"
    "."
    ""
    ""
    ""
    ".hidden"
```

### Veja também

[ filename](<#/doc/experimental/fs/path/filename>) | retorna o componente de nome de arquivo do path
(public member function)
[ stem](<#/doc/experimental/fs/path/stem>) | retorna o componente stem do path
(public member function)
[ replace_extension](<#/doc/experimental/fs/path/replace_extension>) | substitui a extensão
(public member function)
[ has_extension](<#/doc/experimental/fs/path/has_path>) | verifica se o elemento do path correspondente não está vazio
(public member function)