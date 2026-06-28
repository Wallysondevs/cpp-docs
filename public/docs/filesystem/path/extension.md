# std::filesystem::path::extension

path extension() const; |  |  (desde C++17)  

  
Retorna a extensão do componente de nome de arquivo da visão em formato genérico de *this.

Se o componente [`filename()`](<#/doc/filesystem/path/filename>) do caminho em formato genérico contiver um ponto (`.`), e não for um dos elementos especiais do sistema de arquivos "ponto" ou "ponto-ponto", então a _extensão_ é a substring que começa no ponto mais à direita (incluindo o ponto) e vai até o final do nome do caminho.

Se o primeiro caractere no nome do arquivo for um ponto, esse ponto é ignorado (um nome de arquivo como ".profile" não é tratado como uma extensão).

Se o nome do caminho for `.` ou `..`, ou se [`filename()`](<#/doc/filesystem/path/filename>) não contiver o caractere '.', então um caminho vazio é retornado.

Comportamento adicional pode ser definido pelas implementações para sistemas de arquivos que anexam elementos adicionais (como fluxos de dados alternativos ou nomes de conjuntos de dados particionados) às extensões.

### Parâmetros

(nenhum)

### Valor de retorno

A extensão do nome do caminho atual ou um caminho vazio se não houver extensão.

### Exceções

Pode lançar exceções definidas pela implementação.

### Notas

A extensão retornada por esta função inclui um ponto para possibilitar a distinção entre um arquivo que termina com um ponto (a função retorna ".") e um arquivo sem extensão (a função retorna "").

Em um sistema não-POSIX, é possível que p.stem() + p.extension() != p.filename() mesmo que as versões em formato genérico sejam as mesmas.

### Exemplo

Execute este código
```
    #include <filesystem>
    #include <iostream>
    namespace fs = std::filesystem;
     
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
                  << fs::path("/foo/.hidden").extension() << '\n'
                  << fs::path("/foo/..bar").extension() << '\n';
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
    ""
    ".bar"
```

### Veja também

[ filename](<#/doc/filesystem/path/filename>) | retorna o componente de nome de arquivo do caminho   
(função membro pública)  
[ stem](<#/doc/filesystem/path/stem>) | retorna o componente stem do caminho (nome do arquivo sem a extensão final)   
(função membro pública)  
[ replace_extension](<#/doc/filesystem/path/replace_extension>) | substitui a extensão   
(função membro pública)  
[ has_extension](<#/doc/filesystem/path/has_path>) | verifica se o elemento de caminho correspondente não está vazio   
(função membro pública)