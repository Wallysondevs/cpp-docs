# std::filesystem::recursive_directory_iterator::depth

int depth() const; | | (desde C++17)

Retorna o número de diretórios do diretório inicial até o diretório atualmente iterado, ou seja, a profundidade atual da hierarquia de diretórios.

O diretório inicial tem profundidade 0, seus subdiretórios têm profundidade 1, etc.

O comportamento é indefinido se *this for o iterador final.

### Parâmetros

(nenhum)

### Valor de retorno

Profundidade atual da hierarquia de diretórios.

### Exceções

Não lança exceções.

### Exemplo

Este exemplo usa a profundidade da iteração para calcular a indentação de uma impressão de árvore de diretórios.

Execute este código
```cpp
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
        for (auto i = fs::recursive_directory_iterator("sandbox");
             i != fs::recursive_directory_iterator();
             ++i)
        {
            std::cout << std::string(i.depth() << 1, ' ') << *i;
            if (fs::is_symlink(i->symlink_status()))
                std::cout << " -> " << fs::read_symlink(*i);
            std::cout << '\n';
        }
        fs::remove_all("sandbox");
    }
```

Saída:
```
    "sandbox/syma" -> "a"
    "sandbox/a"
      "sandbox/a/b"
        "sandbox/a/b/d"
          "sandbox/a/b/d/e"
        "sandbox/a/b/file1.txt"
        "sandbox/a/b/c"
```