# std::filesystem::recursive_directory_iterator::disable_recursion_pending

```cpp
void disable_recursion_pending();
```
| | | (desde C++17)

Desabilita a recursão para o subdiretório atualmente referenciado, se houver.

A chamada modifica a flag de recursão pendente no iterator de tal forma que, na próxima vez que [`increment`](<#/doc/filesystem/recursive_directory_iterator/increment>) for chamado, o iterator avançará dentro do diretório atual, mesmo que esteja atualmente referenciando um subdiretório que não foi visitado.

O status da flag de recursão pendente pode ser consultado com [`recursion_pending()`](<#/doc/filesystem/recursive_directory_iterator/recursion_pending>), que é `false` após esta chamada. Ela é redefinida para `true` após [`increment`](<#/doc/filesystem/recursive_directory_iterator/increment>), e seu valor inicial também é `true`.

O comportamento é indefinido se `*this` for o iterator de fim.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    #include <filesystem>
    #include <fstream>
    #include <iostream>
    #include <string>
    namespace fs = std::filesystem;
    
    int main()
    {
        fs::current_path(fs::temp_directory_path());
        fs::create_directories("sandbox/a/b/c");
        fs::create_directories("sandbox/a/b/d/e");
        std::ofstream("sandbox/a/b/file1.txt");
        fs::create_symlink("a", "sandbox/syma");
        std::system("tree sandbox");
        for (auto i = fs::recursive_directory_iterator("sandbox");
             i != fs::recursive_directory_iterator();
             ++i)
        {
            std::cout << std::string(i.depth() * 2, ' ') << *i;
            if (fs::is_symlink(i->symlink_status()))
                std::cout << " -> " << fs::read_symlink(*i);
            std::cout << '\n';
    
            // do not descend into "b"
            if (i->path().filename() == "b")
                i.disable_recursion_pending();
        }
        fs::remove_all("sandbox");
    }
```

Saída possível:
```
    sandbox
    ├── a
    │   └── b
    │       ├── c
    │       ├── d
    │       │   └── e
    │       └── file1.txt
    └── syma -> a
    
    "sandbox/a"
      "sandbox/a/b"
    "sandbox/syma" -> "a"
```

### Veja também

[ recursion_pending](<#/doc/filesystem/recursive_directory_iterator/recursion_pending>) | verifica se a recursão está desabilitada para o diretório atual
(função membro pública)
[ incrementoperator++](<#/doc/filesystem/recursive_directory_iterator/increment>) | avança para a próxima entrada
(função membro pública)