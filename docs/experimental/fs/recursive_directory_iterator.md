# std::experimental::filesystem::recursive_directory_iterator

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
class recursive_directory_iterator;
```

`recursive_directory_iterator` é um [LegacyInputIterator](<#/doc/named_req/InputIterator>) que itera sobre os elementos [`directory_entry`](<#/doc/experimental/fs/directory_entry>) de um diretório e, recursivamente, sobre as entradas de todos os subdiretórios. A ordem de iteração não é especificada, exceto que cada entrada de diretório é visitada apenas uma vez.

Por padrão, symlinks não são seguidos, mas isso pode ser habilitado especificando a opção de diretório [`follow_directory_symlink`](<#/doc/experimental/fs/directory_options>) no momento da construção.

Os pathnames especiais dot e dot-dot são ignorados.

Se o `recursive_directory_iterator` for avançado além da última entrada de diretório do diretório de nível superior, ele se torna igual ao iterator construído por padrão, também conhecido como end iterator. Dois end iterators são sempre iguais; desreferenciar ou incrementar o end iterator é comportamento indefinido.

Se um arquivo ou diretório for excluído ou adicionado à árvore de diretórios após a criação do recursive directory iterator, não é especificado se a alteração seria observada através do iterator.

Se a estrutura de diretórios contiver ciclos, o end iterator pode ser inatingível.

### Tipos membro

Tipo membro | Definição
---|---
`value_type` | `filesystem::directory_entry`
`difference_type` | `std::ptrdiff_t`
`pointer` | `const filesystem::directory_entry*`
`reference` | `const filesystem::directory_entry&`
`iterator_category` | `std::input_iterator_tag`

### Funções membro

[ (construtor)](<#/doc/experimental/fs/recursive_directory_iterator/recursive_directory_iterator>) | constrói um recursive directory iterator
(função membro pública)
(destrutor) | destrutor padrão
(função membro pública)

##### Observadores

[ operator*operator->](<#/doc/experimental/fs/recursive_directory_iterator/operator_star_>) | acessa a entrada apontada
(função membro pública)
[ options](<#/doc/experimental/fs/recursive_directory_iterator/options>) | retorna as opções atualmente ativas que afetam a iteração
(função membro pública)
[ depth](<#/doc/experimental/fs/recursive_directory_iterator/depth>) | retorna a profundidade de recursão atual
(função membro pública)
[ recursion_pending](<#/doc/experimental/fs/recursive_directory_iterator/recursion_pending>) | verifica se a recursão está desabilitada para o diretório atual
(função membro pública)

##### Modificadores

[ operator=](<#/>) | atribui conteúdo
(função membro pública)
[ incrementoperator++](<#/doc/experimental/fs/recursive_directory_iterator/increment>) | avança para a próxima entrada
(função membro pública)
[ pop](<#/doc/experimental/fs/recursive_directory_iterator/pop>) | move o iterator um nível acima na hierarquia de diretórios
(função membro pública)
[ disable_recursion_pending](<#/doc/experimental/fs/recursive_directory_iterator/disable_recursion_pending>) | desabilita a recursão até o próximo incremento
(função membro pública)

### Funções não-membro

[ filesystem::begin(filesystem::recursive_directory_iterator)filesystem::end(filesystem::recursive_directory_iterator)](<#/doc/experimental/fs/recursive_directory_iterator/begin>) | suporte para loop for baseado em range
(função)

Além disso, `operator==` e `operator!=` são fornecidos, seja como membros ou como não-membros, conforme exigido por [LegacyInputIterator](<#/doc/named_req/InputIterator>).

### Notas

Um `recursive_directory_iterator` tipicamente mantém um _ponteiro_ com contagem de referências (para satisfazer a semântica de cópia superficial de [LegacyInputIterator](<#/doc/named_req/InputIterator>)) para um objeto de implementação, que contém:

*   um container (como [std::vector](<#/doc/container/vector>)) de [`directory_iterator`s](<#/doc/experimental/fs/directory_iterator>) não recursivos que forma a pilha de recursão.
*   o contador de profundidade de recursão (acessível com [`depth()`](<#/doc/experimental/fs/recursive_directory_iterator/depth>)).
*   as opções de diretório usadas na construção (acessíveis com [`options()`](<#/doc/experimental/fs/recursive_directory_iterator/options>)).
*   o flag de recursão pendente (acessível com [`recursion_pending()`](<#/doc/experimental/fs/recursive_directory_iterator/recursion_pending>), pode ser combinado com as opções de diretório para economizar espaço).

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
        std::ofstream("sandbox/file1.txt");
        fs::create_symlink("a", "sandbox/syma");
        for (const fs::directory_entry& entry : fs::recursive_directory_iterator("sandbox"))
            std::cout << entry << '\n';
        fs::remove_all("sandbox");
    }
```

Saída possível:
```
    "sandbox/a"
    "sandbox/a/b"
    "sandbox/file1.txt"
    "sandbox/syma"
```

### Veja também

[ directory_iterator](<#/doc/experimental/fs/directory_iterator>) | um iterator para o conteúdo do diretório
(classe)
[ directory_entry](<#/doc/experimental/fs/directory_entry>) | uma entrada de diretório
(classe)
[ directory_options](<#/doc/experimental/fs/directory_options>) | opções para iterar o conteúdo do diretório
(enum)