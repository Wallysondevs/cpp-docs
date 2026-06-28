# std::filesystem::recursive_directory_iterator

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
class recursive_directory_iterator;
```

`recursive_directory_iterator` é um [LegacyInputIterator](<#/doc/named_req/InputIterator>) que itera sobre os elementos [`directory_entry`](<#/doc/filesystem/directory_entry>) de um diretório e, recursivamente, sobre as entradas de todos os subdiretórios. A ordem de iteração é não especificada, exceto que cada entrada de diretório é visitada apenas uma vez.

Por padrão, symlinks não são seguidos, mas isso pode ser habilitado especificando a opção de diretório [`follow_directory_symlink`](<#/doc/filesystem/directory_options>) no momento da construção.

Os nomes de caminho especiais ponto e ponto-ponto são ignorados.

Se o `recursive_directory_iterator` reportar um erro ou for avançado além da última entrada de diretório do diretório de nível superior, ele se torna igual ao iterator construído por padrão, também conhecido como iterator final. Dois iterators finais são sempre iguais; desreferenciar ou incrementar o iterator final é comportamento indefinido.

Se um arquivo ou diretório for excluído ou adicionado à árvore de diretórios após a criação do iterator de diretório recursivo, é não especificado se a alteração seria observada através do iterator.

Se a estrutura de diretórios contiver ciclos, o iterator final pode ser inalcançável.

### Member types

Tipo membro | Definição
---|---
`value_type` | [std::filesystem::directory_entry](<#/doc/filesystem/directory_entry>)
`difference_type` | [std::ptrdiff_t](<#/doc/types/ptrdiff_t>)
`pointer` | const [std::filesystem::directory_entry](<#/doc/filesystem/directory_entry>)*
`reference` | const [std::filesystem::directory_entry](<#/doc/filesystem/directory_entry>)&
`iterator_category` | [std::input_iterator_tag](<#/doc/iterator/iterator_tags>)

### Member functions

[ (constructor)](<#/doc/filesystem/recursive_directory_iterator/recursive_directory_iterator>) | constrói um iterator de diretório recursivo
(função membro pública)
(destructor) | destrutor padrão
(função membro pública)

##### Observadores

[ operator*operator->](<#/doc/filesystem/recursive_directory_iterator/operator_star_>) | acessa a entrada apontada
(função membro pública)
[ options](<#/doc/filesystem/recursive_directory_iterator/options>) | retorna as opções ativas atualmente que afetam a iteração
(função membro pública)
[ depth](<#/doc/filesystem/recursive_directory_iterator/depth>) | retorna a profundidade de recursão atual
(função membro pública)
[ recursion_pending](<#/doc/filesystem/recursive_directory_iterator/recursion_pending>) | verifica se a recursão está desabilitada para o diretório atual
(função membro pública)

##### Modificadores

[ operator=](<#/>) | atribui conteúdo
(função membro pública)
[ incrementoperator++](<#/doc/filesystem/recursive_directory_iterator/increment>) | avança para a próxima entrada
(função membro pública)
[ pop](<#/doc/filesystem/recursive_directory_iterator/pop>) | move o iterator um nível acima na hierarquia de diretórios
(função membro pública)
[ disable_recursion_pending](<#/doc/filesystem/recursive_directory_iterator/disable_recursion_pending>) | desabilita a recursão até o próximo incremento
(função membro pública)

### Non-member functions

[ begin(std::filesystem::recursive_directory_iterator)end(std::filesystem::recursive_directory_iterator)](<#/doc/filesystem/recursive_directory_iterator/begin>) | suporte para loop for baseado em range
(função)

Além disso, `operator==` e `operator!=` são(até C++20)`operator==` é(desde C++20) fornecidos conforme exigido por [LegacyInputIterator](<#/doc/named_req/InputIterator>).

É não especificado se `operator!=` é fornecido porque ele pode ser sintetizado a partir de `operator==`, e(desde C++20) se um operador de igualdade é membro ou não-membro.

### Helper specializations

```cpp
template<>
constexpr bool
ranges::enable_borrowed_range<std::filesystem::recursive_directory_iterator> = true;  // (desde C++20)
template<>
constexpr bool
ranges::enable_view<std::filesystem::recursive_directory_iterator> = true;  // (desde C++20)
```

Essas especializações para `recursive_directory_iterator` o tornam um [`borrowed_range`](<#/doc/ranges/borrowed_range>) e um [`view`](<#/doc/ranges/view>).

### Notas

Um `recursive_directory_iterator` tipicamente mantém um _ponteiro_ com contagem de referências (para satisfazer a semântica de cópia rasa de [LegacyInputIterator](<#/doc/named_req/InputIterator>)) para um objeto de implementação, que contém:

*   um container (como [std::vector](<#/doc/container/vector>)) de [`directory_iterator`s](<#/doc/filesystem/directory_iterator>) não recursivos que forma a pilha de recursão,
*   o contador de profundidade de recursão (acessível com [`depth()`](<#/doc/filesystem/recursive_directory_iterator/depth>)),
*   as opções de diretório usadas na construção (acessíveis com [`options()`](<#/doc/filesystem/recursive_directory_iterator/options>)),
*   o flag de recursão pendente (acessível com [`recursion_pending()`](<#/doc/filesystem/recursive_directory_iterator/recursion_pending>), pode ser combinado com as opções de diretório para economizar espaço).

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <fstream>
    #include <iostream>
    #include <string>
    namespace fs = std::filesystem;
    
    int main()
    {
        std::filesystem::current_path(std::filesystem::temp_directory_path());
        std::filesystem::create_directories("sandbox/a/b");
        std::ofstream("sandbox/file1.txt");
        std::filesystem::create_symlink("a", "sandbox/syma");
    
        // Iterate over the std::filesystem::directory_entry elements explicitly
        auto entry_length{3UZ};
        for (const fs::directory_entry& dir_entry :
                fs::recursive_directory_iterator("sandbox"))
        {
            std::cout << dir_entry << '\n';
            if (auto l{dir_entry.path().string().length()}; entry_length < l)
                entry_length = l;
        }
        std::cout << std::string(entry_length + 2, '-') << '\n';
    
        // Iterate over the std::filesystem::directory_entry elements using `auto`
        for (auto const& dir_entry : fs::recursive_directory_iterator("sandbox"))
            std::cout << dir_entry << '\n';
    
        std::filesystem::remove_all("sandbox");
    }
```

Saída possível:
```
    "sandbox/syma"
    "sandbox/file1.txt"
    "sandbox/a"
    "sandbox/a/b"
    -------------------
    "sandbox/syma"
    "sandbox/file1.txt"
    "sandbox/a"
    "sandbox/a/b"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 3480](<https://cplusplus.github.io/LWG/issue3480>) | C++20 | `recursive_directory_iterator` não era nem um [`borrowed_range`](<#/doc/ranges/borrowed_range>) nem um [`view`](<#/doc/ranges/view>) | é ambos

### Ver também

[ directory_iterator](<#/doc/filesystem/directory_iterator>)(C++17) | um iterator para o conteúdo do diretório
(classe)
[ directory_entry](<#/doc/filesystem/directory_entry>)(C++17) | uma entrada de diretório
(classe)
[ directory_options](<#/doc/filesystem/directory_options>)(C++17) | opções para iterar o conteúdo do diretório
(enum)