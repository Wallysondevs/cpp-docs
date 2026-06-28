# std::experimental::filesystem::create_directory, std::experimental::filesystem::create_directories

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
bool create_directory( const path& p );
bool create_directory( const path& p, error_code& ec );
bool create_directory( const path& p, const path& existing_p );
bool create_directory( const path& p, const path& existing_p, error_code& ec );
bool create_directories( const path& p );
bool create_directories( const path& p, error_code& ec );
```

  
1) Cria o diretório p como se fosse por POSIX [mkdir()](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/mkdir.html>) com um segundo argumento de static_cast&lt;int&gt;(fs::perms::all) (o diretório pai já deve existir). Se p já existe e já é um diretório, a função não faz nada (esta condição não é tratada como um erro). 

2) O mesmo que (1), exceto que os atributos do novo diretório são copiados de existing_p (que deve ser um diretório existente). É dependente do sistema operacional quais atributos são copiados: em sistemas POSIX, os atributos são copiados como se fosse por 
```
    stat(existing_p.c_str(), &attributes_stat)
    mkdir(p.c_str(), attributes_stat.st_mode)
```

No sistema operacional Windows, os atributos são copiados como se fosse por 
```
    CreateDirectoryExW(existing_p.c_str(), p.c_str(), 0)
```

3) Executa (1) para cada elemento de p que ainda não existe.

As sobrecargas que não lançam exceções retornam false se ocorrer algum erro. 

### Parâmetros

p  |  \-  |  o caminho para o novo diretório a ser criado   
---|---|---
existing_p  |  \-  |  o caminho para um diretório do qual copiar os atributos   
ec  |  \-  |  parâmetro de saída para relatório de erros na sobrecarga que não lança exceções   
  
### Valor de retorno

1,2) true se a criação do diretório for bem-sucedida, false caso contrário.

### Exceções

1,3) A sobrecarga que não recebe um parâmetro error_code& lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros subjacentes da API do sistema operacional, construída com p como o primeiro argumento e o código de erro do sistema operacional como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro error_code& o define para o código de erro da API do sistema operacional se uma chamada de API do sistema operacional falhar, e executa ec.clear() se nenhum erro ocorrer. Esta sobrecarga possui a especificação 

[`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept

2) A sobrecarga que não recebe um parâmetro error_code& lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros subjacentes da API do sistema operacional, construída com p como o primeiro argumento, existing_p como o segundo argumento e o código de erro do sistema operacional como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro error_code& o define para o código de erro da API do sistema operacional se uma chamada de API do sistema operacional falhar, e executa ec.clear() se nenhum erro ocorrer. Esta sobrecarga possui a especificação 

[`noexcept`](<#/doc/language/noexcept_spec>): 

noexcept

### Notas

A sobrecarga que preserva atributos (2) é implicitamente invocada por [`copy()`](<#/doc/experimental/fs/copy>) ao copiar diretórios recursivamente. Seu equivalente em boost.filesystem é [copy_directory](<https://www.boost.org/doc/libs/1_57_0/libs/filesystem/doc/reference.html#copy_directory>) (com a ordem dos argumentos invertida). 

### Exemplo

Execute este código
```
    #include <cstdlib>
    #include <experimental/filesystem>
    #include <fstream>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
     
    int main()
    {
        fs::create_directories("sandbox/1/2/a");
        fs::create_directory("sandbox/1/2/b");
        fs::permissions("sandbox/1/2/b", fs::perms::remove_perms | fs::perms::others_all);
        fs::create_directory("sandbox/1/2/c", "sandbox/1/2/b");
        std::system("ls -l sandbox/1/2");
        fs::remove_all("sandbox");
    }
```

Saída possível: 
```
    drwxr-xr-x 2 user group 4096 Apr 15 09:33 a
    drwxr-x--- 2 user group 4096 Apr 15 09:33 b
    drwxr-x--- 2 user group 4096 Apr 15 09:33 c
```

### Veja também

[ create_symlinkcreate_directory_symlink](<#/doc/experimental/fs/create_symlink>) | cria um link simbólico   
(função)  
[ copy](<#/doc/experimental/fs/copy>) | copia arquivos ou diretórios   
(função)  
[ perms](<#/doc/experimental/fs/perms>) | identifica permissões do sistema de arquivos   
(enum)