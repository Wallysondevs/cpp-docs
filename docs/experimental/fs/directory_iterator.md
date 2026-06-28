# std::experimental::filesystem::directory_iterator

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
class directory_iterator;
```

`directory_iterator` é um [LegacyInputIterator](<#/doc/named_req/InputIterator>) que itera sobre os elementos [`directory_entry`](<#/doc/experimental/fs/directory_entry>) de um diretório (mas não visita os subdiretórios). A ordem de iteração é não especificada, exceto que cada entrada de diretório é visitada apenas uma vez. Os nomes de caminho especiais ponto e ponto-ponto são ignorados.

Se o `directory_iterator` for avançado além da última entrada de diretório, ele se torna igual ao iterator construído por padrão, também conhecido como iterator de fim. Dois iterators de fim são sempre iguais; desreferenciar ou incrementar o iterator de fim é comportamento indefinido.

Se um arquivo ou diretório for excluído ou adicionado à árvore de diretórios após a criação do directory iterator, é não especificado se a mudança seria observada através do iterator.

### Tipos de membro

Tipo de membro | Definição
---|---
`value_type` | `filesystem::directory_entry`
`difference_type` | `std::ptrdiff_t`
`pointer` | `const filesystem::directory_entry*`
`reference` | `const filesystem::directory_entry&`
`iterator_category` | `std::input_iterator_tag`

### Funções membro

[ (constructor)](<#/doc/experimental/fs/directory_iterator/directory_iterator>) | constrói um directory iterator
(função membro pública)
(destructor) | destrutor padrão
(função membro pública)
[ operator=](<#/>) | atribui conteúdo
(função membro pública)
[ operator*operator->](<#/doc/experimental/fs/directory_iterator/operator_star_>) | acessa a entrada apontada
(função membro pública)
[ incrementoperator++](<#/doc/experimental/fs/directory_iterator/increment>) | avança para a próxima entrada
(função membro pública)

### Funções não-membro

[ filesystem::begin(filesystem::directory_iterator)filesystem::end(filesystem::directory_iterator)](<#/doc/experimental/fs/directory_iterator/begin>) | suporte para loop for baseado em range
(função)

Adicionalmente, operator== e operator!= são fornecidos, seja como membros ou como não-membros, conforme exigido por [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Exemplo

Execute este código
```cpp
    #include <experimental/filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        fs::create_directories("sandbox/a/b");
        std::ofstream{"sandbox/file1.txt"};
        std::ofstream{"sandbox/file2.txt"};
        for (const fs::directory_entry& entry : fs::directory_iterator{"sandbox"})
            std::cout << entry << '\n';
        fs::remove_all("sandbox");
    }
```

Saída possível:
```
    "sandbox/a"
    "sandbox/file1.txt"
    "sandbox/file2.txt"
```

### Ver também

[ recursive_directory_iterator](<#/doc/experimental/fs/recursive_directory_iterator>) | um iterator para o conteúdo de um diretório e seus subdiretórios
(classe)
[ directory_options](<#/doc/experimental/fs/directory_options>) | opções para iterar o conteúdo do diretório
(enum)
[ directory_entry](<#/doc/experimental/fs/directory_entry>) | uma entrada de diretório
(classe)