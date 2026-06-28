# std::filesystem::directory_iterator

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
class directory_iterator;
```

`directory_iterator` é um [LegacyInputIterator](<#/doc/named_req/InputIterator>) que itera sobre os elementos [`directory_entry`](<#/doc/filesystem/directory_entry>) de um diretório (mas não visita os subdiretórios). A ordem de iteração é não especificada, exceto que cada entrada de diretório é visitada apenas uma vez. Os nomes de caminho especiais ponto e ponto-ponto são ignorados.

Se o `directory_iterator` reportar um erro ou for avançado além da última entrada de diretório, ele se torna igual ao iterator construído por padrão, também conhecido como iterator de fim. Dois iterators de fim são sempre iguais; desreferenciar ou incrementar o iterator de fim é comportamento indefinido.

Se um arquivo ou diretório for excluído ou adicionado à árvore de diretórios após a criação do iterator de diretório, é não especificado se a alteração seria observada através do iterator.

### Tipos membro

Tipo membro | Definição
---|---
`value_type` | [std::filesystem::directory_entry](<#/doc/filesystem/directory_entry>)
`difference_type` | [std::ptrdiff_t](<#/doc/types/ptrdiff_t>)
`pointer` | const [std::filesystem::directory_entry](<#/doc/filesystem/directory_entry>)*
`reference` | const [std::filesystem::directory_entry](<#/doc/filesystem/directory_entry>)&
`iterator_category` | [std::input_iterator_tag](<#/doc/iterator/iterator_tags>)

### Funções membro

[ (construtor)](<#/doc/filesystem/directory_iterator/directory_iterator>) | constrói um iterator de diretório
(função membro pública)
(destrutor) | destrutor padrão
(função membro pública)
[ operator=](<#/>) | atribui conteúdo
(função membro pública)
[ operator*operator->](<#/doc/filesystem/directory_iterator/operator_star_>) | acessa a entrada apontada
(função membro pública)
[ incrementoperator++](<#/doc/filesystem/directory_iterator/increment>) | avança para a próxima entrada
(função membro pública)

### Funções não-membro

[ begin(std::filesystem::directory_iterator)end(std::filesystem::directory_iterator)](<#/doc/filesystem/directory_iterator/begin>)(C++17) | suporte para loop for baseado em range
(função)

Adicionalmente, `operator==` e `operator!=` são(até C++20)`operator==` é(desde C++20) fornecido conforme exigido por [LegacyInputIterator](<#/doc/named_req/InputIterator>).

É não especificado se `operator!=` é fornecido porque pode ser sintetizado a partir de `operator==`, e(desde C++20) se um operador de igualdade é membro ou não-membro.

### Especializações auxiliares

```cpp
template<>
constexpr bool
ranges::enable_borrowed_range<std::filesystem::directory_iterator> = true;  // (desde C++20)
template<>
constexpr bool
ranges::enable_view<std::filesystem::directory_iterator> = true;  // (desde C++20)
```

Essas especializações para `directory_iterator` o tornam um [`borrowed_range`](<#/doc/ranges/borrowed_range>) e um [`view`](<#/doc/ranges/view>).

### Notas

Muitas APIs de baixo nível do sistema operacional para travessia de diretórios recuperam atributos de arquivo junto com a próxima entrada de diretório. Os construtores e as funções membro não-const de **std::filesystem::directory_iterator** armazenam esses atributos, se houver, na [std::filesystem::directory_entry](<#/doc/filesystem/directory_entry>) apontada sem chamar [`directory_entry::refresh`](<#/doc/filesystem/directory_entry/refresh>), o que torna possível examinar os atributos das entradas de diretório enquanto são iteradas, sem fazer chamadas adicionais ao sistema.

### Exemplo

Execute este código
```cpp
    #include <algorithm>
    #include <filesystem>
    #include <fstream>
    #include <iostream>
    
    int main()
    {
        const std::filesystem::path sandbox{"sandbox"};
        std::filesystem::create_directories(sandbox/"dir1"/"dir2");
        std::ofstream{sandbox/"file1.txt"};
        std::ofstream{sandbox/"file2.txt"};
    
        std::cout << "directory_iterator:\n";
        // directory_iterator can be iterated using a range-for loop
        for (auto const& dir_entry : std::filesystem::directory_iterator{sandbox}) 
            std::cout << dir_entry.path() << '\n';
    
        std::cout << "\ndirectory_iterator as a range:\n";
        // directory_iterator behaves as a range in other ways, too
        std::ranges::for_each(
            std::filesystem::directory_iterator{sandbox},
             { std::cout << dir_entry << '\n'; });
    
        std::cout << "\nrecursive_directory_iterator:\n";
        for (auto const& dir_entry : std::filesystem::recursive_directory_iterator{sandbox}) 
            std::cout << dir_entry << '\n';
    
        // delete the sandbox dir and all contents within it, including subdirs
        std::filesystem::remove_all(sandbox);
    }
```

Saída possível:
```
    directory_iterator:
    "sandbox/file2.txt"
    "sandbox/file1.txt"
    "sandbox/dir1"
    
    directory_iterator as a range:
    "sandbox/file2.txt"
    "sandbox/file1.txt"
    "sandbox/dir1"
    
    recursive_directory_iterator:
    "sandbox/file2.txt"
    "sandbox/file1.txt"
    "sandbox/dir1"
    "sandbox/dir1/dir2"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3480](<https://cplusplus.github.io/LWG/issue3480>) | C++20 | `directory_iterator` não era nem um [`borrowed_range`](<#/doc/ranges/borrowed_range>) nem um [`view`](<#/doc/ranges/view>) | é ambos

### Ver também

[ recursive_directory_iterator](<#/doc/filesystem/recursive_directory_iterator>)(C++17) | um iterator para o conteúdo de um diretório e seus subdiretórios
(classe)
[ directory_options](<#/doc/filesystem/directory_options>)(C++17) | opções para iterar o conteúdo do diretório
(enum)
[ directory_entry](<#/doc/filesystem/directory_entry>)(C++17) | uma entrada de diretório
(classe)