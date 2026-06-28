# std::filesystem::path::replace_extension

path& replace_extension( const path& replacement = path() ); |  |  (desde C++17)  

  
Substitui a extensão por `replacement` ou a remove quando o valor padrão de `replacement` é usado.

Primeiramente, se este caminho tiver uma [`extension()`](<#/doc/filesystem/path/extension>), ela é removida da visão de formato genérico do nome do caminho.

Em seguida, um caractere de ponto é anexado à visão de formato genérico do nome do caminho, se `replacement` não estiver vazio e não começar com um caractere de ponto.

Então `replacement` é anexado como se por `operator+=(replacement)`.

### Parâmetros

replacement  |  \-  |  a extensão para substituir   
  
### Valor de retorno

*this

### Exceções

Pode lançar exceções definidas pela implementação.

### Observações

O tipo de `replacement` é [std::filesystem::path](<#/doc/filesystem/path>) mesmo que não se destine a representar um objeto no sistema de arquivos, a fim de considerar corretamente a codificação de caracteres do sistema de arquivos.

### Exemplo

Execute este código
```
    #include <filesystem>
    #include <iomanip>
    #include <iostream>
    #include <utility>
     
    int main()
    {
        const int width1{18}, width2{11}; // columns' width
     
        std::cout << std::left << std::setw(width1) << "Path:"
                  << std::setw(width2) << "Ext:" << "Result:\n";
        for (const auto& [p, e] : {
                std::make_pair("/foo/bar.jpg", ".png"),
                {"/foo/bar.jpg", "png"},
                {"/foo/bar.jpg", "."},
                {"/foo/bar.jpg", ""},
                {"/foo/bar.", "png"},
                {"/foo/bar", ".png"},
                {"/foo/bar", "png"},
                {"/foo/bar", "."},
                {"/foo/bar", ""},
                {"/foo/.", ".png"},
                {"/foo/.", "png"},
                {"/foo/.", "."},
                {"/foo/.", ""},
                {"/foo/", ".png"},
                {"/foo/", "png"}})
        {
            std::filesystem::path path{p}, ext{e};
            std::cout << std::setw(width1) << path << std::setw(width2) << ext;
            path.replace_extension(ext);
            std::cout << path << '\n';
        }
    }
```

Saída: 
```
    Path:             Ext:       Result:
    "/foo/bar.jpg"    ".png"     "/foo/bar.png"
    "/foo/bar.jpg"    "png"      "/foo/bar.png"
    "/foo/bar.jpg"    "."        "/foo/bar."
    "/foo/bar.jpg"    ""         "/foo/bar"
    "/foo/bar."       "png"      "/foo/bar.png"
    "/foo/bar"        ".png"     "/foo/bar.png"
    "/foo/bar"        "png"      "/foo/bar.png"
    "/foo/bar"        "."        "/foo/bar."
    "/foo/bar"        ""         "/foo/bar"
    "/foo/."          ".png"     "/foo/..png"
    "/foo/."          "png"      "/foo/..png"
    "/foo/."          "."        "/foo/.."
    "/foo/."          ""         "/foo/."
    "/foo/"           ".png"     "/foo/.png"
    "/foo/"           "png"      "/foo/.png"
```

### Veja também

[ extension](<#/doc/filesystem/path/extension>) |  retorna o componente de extensão do caminho do arquivo   
(função membro pública)  
[ filename](<#/doc/filesystem/path/filename>) |  retorna o componente de nome de arquivo do caminho   
(função membro pública)  
[ stem](<#/doc/filesystem/path/stem>) |  retorna o componente stem do caminho (nome do arquivo sem a extensão final)   
(função membro pública)  
[ has_extension](<#/doc/filesystem/path/has_path>) |  verifica se o elemento de caminho correspondente não está vazio   
(função membro pública)