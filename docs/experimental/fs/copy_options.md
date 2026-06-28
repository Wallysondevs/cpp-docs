# std::experimental::filesystem::copy_options

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
enum class copy_options {
none = 0,
skip_existing = 1,
overwrite_existing = 2,
update_existing = 4,
recursive = 8,
copy_symlinks = 16,
skip_symlinks = 32,
directories_only = 64,
create_symlinks = 128,
create_hard_links = 256
};
```

  
Este tipo representa as opções disponíveis que controlam o comportamento das funções [`copy()`](<#/doc/experimental/fs/copy>) e [`copy_file()`](<#/doc/experimental/fs/copy_file>). 

`copy_options` satisfaz os requisitos de [BitmaskType](<#/doc/named_req/BitmaskType>) (o que significa que os operadores bit a bit operator&, operator|, operator^, operator~, operator&=, operator|=, e operator^= são definidos para este tipo). 

### Constantes Membro

No máximo uma opção de cópia em cada um dos seguintes grupos de opções pode estar presente, caso contrário, o comportamento das funções de cópia é indefinido. 

Constante Membro  | Valor  | Significado   
opções que controlam [`copy_file()`](<#/doc/experimental/fs/copy_file>) quando o arquivo já existe   
`none` | ​0​ | Reporta um erro (comportamento padrão).   
---|---|---
`skip_existing` | 1 | Mantém o arquivo existente, sem reportar um erro.   
`overwrite_existing` | 2 | Substitui o arquivo existente.   
`update_existing` | 4 | Substitui o arquivo existente apenas se ele for mais antigo que o arquivo sendo copiado.   
opções que controlam os efeitos de [`copy()`](<#/doc/experimental/fs/copy>) em subdiretórios   
`none` | ​0​ | Ignora subdiretórios (comportamento padrão).   
---|---|---
`recursive` | 8 | Copia recursivamente subdiretórios e seu conteúdo.   
opções que controlam os efeitos de [`copy()`](<#/doc/experimental/fs/copy>) em links simbólicos   
`none` | ​0​ | Segue symlinks (comportamento padrão).   
---|---|---
`copy_symlinks` | 16 | Copia symlinks como symlinks, não como os arquivos para os quais eles apontam.   
`skip_symlinks` | 32 | Ignora symlinks.   
opções que controlam o tipo de cópia que [`copy()`](<#/doc/experimental/fs/copy>) realiza   
`none` | ​0​ | Copia o conteúdo do arquivo (comportamento padrão).   
---|---|---
`directories_only` | 64 | Copia a estrutura de diretórios, mas não copia nenhum arquivo que não seja diretório.   
`create_symlinks` | 128 | Em vez de criar cópias de arquivos, cria symlinks apontando para os originais. Nota: o caminho de origem deve ser um caminho absoluto, a menos que o caminho de destino esteja no diretório atual.   
`create_hard_links` | 256 | Em vez de criar cópias de arquivos, cria hardlinks que resolvem para os mesmos arquivos que os originais.   
  
### Exemplo

Execute este código
```
    #include <experimental/filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
     
    int main()
    {
        fs::create_directories("sandbox/dir/subdir");
        std::ofstream("sandbox/file1.txt").put('a');
        fs::copy("sandbox/file1.txt", "sandbox/file2.txt"); // copia arquivo
        fs::copy("sandbox/dir", "sandbox/dir2"); // copia diretório (não recursivo)
        // sandbox contém 2 arquivos e 2 diretórios, um dos quais tem um subdiretório
        // sandbox/file1.txt
        // sandbox/file2.txt
        // sandbox/dir2
        // sandbox/dir
        //    sandbox/dir/subdir
        fs::copy("sandbox", "sandbox/copy", fs::copy_options::recursive);
        // sandbox/copy contém cópias dos arquivos e subdiretórios acima
        fs::remove_all("sandbox");
    }
```

### Veja também

[ copy](<#/doc/experimental/fs/copy>) |  copia arquivos ou diretórios   
(função)  
[ copy_file](<#/doc/experimental/fs/copy_file>) |  copia o conteúdo de arquivos   
(função)