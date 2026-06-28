# std::filesystem::copy_symlink

Definido no cabeçalho `[<filesystem>](<#/doc/header/filesystem>)`

```c
void copy_symlink( const std::filesystem::path& from,
const std::filesystem::path& to);
void copy_symlink( const std::filesystem::path& from,
const std::filesystem::path& to,
std::error_code& ec ) noexcept;
```

  
Copia um symlink para outro local.

1) Efetivamente chama f(read_symlink(from), to) onde `f` é [`create_symlink`](<#/doc/filesystem/create_symlink>) ou [`create_directory_symlink`](<#/doc/filesystem/create_symlink>) dependendo se `from` resolve para um arquivo ou diretório.

2) Efetivamente chama f(read_symlink(from, ec), to, ec) onde `f` é [`create_symlink`](<#/doc/filesystem/create_symlink>) ou [`create_directory_symlink`](<#/doc/filesystem/create_symlink>) dependendo se `from` resolve para um arquivo ou diretório.

### Parâmetros

from  |  \-  |  caminho para um link simbólico a ser copiado   
---|---|---
to  |  \-  |  caminho de destino do novo symlink   
ec  |  \-  |  parâmetro de saída para relatório de erros na sobrecarga que não lança exceções   
  
### Valor de retorno

(nenhum) 

### Exceções

Qualquer sobrecarga não marcada como `noexcept` pode lançar [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar.  

1) Lança [std::filesystem::filesystem_error](<#/doc/filesystem/filesystem_error>) em erros subjacentes da API do sistema operacional, construída com from como o primeiro argumento de caminho, to como o segundo argumento de caminho, e o código de erro do sistema operacional como o argumento de código de erro.

2) Define um parâmetro [std::error_code](<#/doc/error/error_code>)& com o código de erro da API do sistema operacional se uma chamada de API do sistema operacional falhar, e executa ec.[`clear`](<#/doc/error/error_code/clear>)() se nenhum erro ocorrer.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Ver também

[ copy](<#/doc/filesystem/copy>)(C++17) |  copia arquivos ou diretórios   
(função)  
[ copy_file](<#/doc/filesystem/copy_file>)(C++17) |  copia o conteúdo de arquivos   
(função)  
[ create_symlinkcreate_directory_symlink](<#/doc/filesystem/create_symlink>)(C++17)(C++17) |  cria um link simbólico   
(função)  
[ read_symlink](<#/doc/filesystem/read_symlink>)(C++17) |  obtém o destino de um link simbólico   
(função)