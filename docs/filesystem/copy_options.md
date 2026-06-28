# std::filesystem::copy_options

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
enum class copy_options {
none = /* unspecified */,
skip_existing = /* unspecified */,
overwrite_existing = /* unspecified */,
update_existing = /* unspecified */,
recursive = /* unspecified */,
copy_symlinks = /* unspecified */,
skip_symlinks = /* unspecified */,
directories_only = /* unspecified */,
create_symlinks = /* unspecified */,
create_hard_links = /* unspecified */
};
```

Este tipo representa as opções disponíveis que controlam o comportamento das funções [`copy()`](<#/doc/filesystem/copy>) e [`copy_file()`](<#/doc/filesystem/copy_file>).

`copy_options` satisfaz os requisitos de [BitmaskType](<#/doc/named_req/BitmaskType>) (o que significa que os operadores bit a bit operator&, operator|, operator^, operator~, operator&=, operator|=, e operator^= são definidos para este tipo). `none` representa a bitmask vazia; cada outro enumerador representa um elemento de bitmask distinto.

### Constantes de membro

No máximo uma opção de cópia em cada um dos seguintes grupos de opções pode estar presente, caso contrário, o comportamento das funções de cópia é indefinido.

Constante de membro | Significado
opções que controlam [`copy_file()`](<#/doc/filesystem/copy_file>) quando o arquivo já existe
`none` | Reporta um erro (comportamento padrão).
---|---
`skip_existing` | Mantém o arquivo existente, sem reportar um erro.
`overwrite_existing` | Substitui o arquivo existente.
`update_existing` | Substitui o arquivo existente apenas se for mais antigo que o arquivo sendo copiado.
opções que controlam os efeitos de [`copy()`](<#/doc/filesystem/copy>) em subdiretórios
`none` | Ignora subdiretórios (comportamento padrão).
---|---
`recursive` | Copia recursivamente subdiretórios e seu conteúdo.
opções que controlam os efeitos de [`copy()`](<#/doc/filesystem/copy>) em links simbólicos
`none` | Segue symlinks (comportamento padrão).
---|---
`copy_symlinks` | Copia symlinks como symlinks, não como os arquivos para os quais eles apontam.
`skip_symlinks` | Ignora symlinks.
opções que controlam o tipo de cópia que [`copy()`](<#/doc/filesystem/copy>) realiza
`none` | Copia o conteúdo do arquivo (comportamento padrão).
---|---
`directories_only` | Copia a estrutura de diretórios, mas não copia nenhum arquivo que não seja diretório.
`create_symlinks` | Em vez de criar cópias de arquivos, cria symlinks apontando para os originais. Nota: o caminho de origem deve ser um caminho absoluto, a menos que o caminho de destino esteja no diretório atual.
`create_hard_links` | Em vez de criar cópias de arquivos, cria hardlinks que resolvem para os mesmos arquivos que os originais.

### Exemplo

Execute este código
```cpp
    #include <cstdlib>
    #include <filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::filesystem;
    
    int main()
    {
        fs::create_directories("sandbox/dir/subdir");
        std::ofstream("sandbox/file1.txt").put('a');
        fs::copy("sandbox/file1.txt", "sandbox/file2.txt"); // copy file
        fs::copy("sandbox/dir", "sandbox/dir2"); // copy directory (non-recursive)
        const auto copyOptions = fs::copy_options::update_existing
                               | fs::copy_options::recursive
                               | fs::copy_options::directories_only
                               ;
        fs::copy("sandbox", "sandbox_copy", copyOptions); 
        static_cast<void>(std::system("tree"));
        fs::remove_all("sandbox");
        fs::remove_all("sandbox_copy");
    }
```

Saída possível:
```
    .
    ├── sandbox
    │   ├── dir
    │   │   └── subdir
    │   ├── dir2
    │   ├── file1.txt
    │   └── file2.txt
    └── sandbox_copy
        ├── dir
        │   └── subdir
        └── dir2
    
    8 directories, 2 files
```

### Veja também

[ copy](<#/doc/filesystem/copy>)(C++17) | copia arquivos ou diretórios
(função)
[ copy_file](<#/doc/filesystem/copy_file>)(C++17) | copia o conteúdo de arquivos
(função)