# std::experimental::filesystem::recursive_directory_iterator::disable_recursion_pending

void disable_recursion_pending(); |  |  (filesystem TS)  

  
Desabilita a recursão para o subdiretório atualmente referido, se houver.

A chamada modifica o *flag* de recursão pendente no *iterator* de tal forma que, na próxima vez que [`increment`](<#/doc/experimental/fs/recursive_directory_iterator/increment>) for chamado, o *iterator* avançará dentro do diretório atual, mesmo que esteja atualmente referindo-se a um subdiretório que ainda não foi visitado.

O status do *flag* de recursão pendente pode ser consultado com [`recursion_pending()`](<#/doc/experimental/fs/recursive_directory_iterator/recursion_pending>), que é `false` após esta chamada. Ele é redefinido para `true` após [`increment`](<#/doc/experimental/fs/recursive_directory_iterator/increment>), e seu valor inicial também é `true`.

O comportamento é indefinido se *this for o *end iterator*.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Exceções

Pode lançar exceções definidas pela implementação.

### Exemplo

Execute este código
```cpp
    #include <experimental/filesystem>
    #include <fstream>
    #include <iostream>
    #include <string>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        fs::create_directories("sandbox/a/b/c");
        fs::create_directories("sandbox/a/b/d/e");
        std::ofstream("sandbox/a/b/file1.txt");
        fs::create_symlink("a", "sandbox/syma");
        for (auto i = fs::recursive_directory_iterator("sandbox");
                 i != fs::recursive_directory_iterator(); ++i)
        {
            std::cout << std::string(i.depth(), ' ') << *i;
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

Saída:
```
    "sandbox/a"
     "sandbox/a/b"
    "sandbox/syma" -> "a"
```

### Veja também

[ recursion_pending](<#/doc/experimental/fs/recursive_directory_iterator/recursion_pending>) | verifica se a recursão está desabilitada para o diretório atual   
(função membro pública)  
[ incrementoperator++](<#/doc/experimental/fs/recursive_directory_iterator/increment>) | avança para a próxima entrada   
(função membro pública)