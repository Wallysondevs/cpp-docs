# std::experimental::filesystem::absolute, std::experimental::filesystem::system_complete

Definido no cabeçalho `[<experimental/filesystem>](<#/doc/header/experimental/filesystem>)`

```c
path absolute( const path& p, const path& base = current_path() );
path system_complete( const path& p );
path system_complete( const path& p, error_code& ec );
```

1) Retorna o caminho absoluto de p relativo a base de acordo com as seguintes regras:

  * Se p tiver tanto um nome de raiz quanto um diretório raiz (ex: "C:\users"), então o caminho é retornado, sem modificações.
  * Se p tiver um nome de raiz não seguido por um diretório raiz (ex: "C:text.txt"), então base é inserido entre o nome de raiz de p e o restante de p. Formalmente, p.root_name() / fs::absolute(base).root_directory() / fs::absolute(base).relative_path() / p.relative_path() é retornado.
  * Se p não tiver nome de raiz, mas tiver um diretório raiz (ex: "/var/tmp/file.txt" em um sistema POSIX ou "\users\ABC\Document.doc" no Windows), então o nome de raiz de base, se houver, é prefixado a p (em um sistema POSIX, p não é modificado; em um sistema Windows, "\users\ABC\Document.doc" torna-se "C:\users\ABC\Document.doc"). Formalmente, fs::absolute(base).root_name() / p é retornado.
  * Se p não tiver nome de raiz e nem diretório raiz (ex: "../file.txt"), então a base inteira é prefixada a p. Formalmente, absolute(base) / p é retornado.

2) Obtém o caminho absoluto que identifica o arquivo que a API de abertura de arquivo do sistema operacional acessaria dado o nome de caminho p. Em sistemas POSIX, isso é equivalente a (1) com a base padrão (`fs::current_path()`). Em sistemas Windows, cada unidade lógica tem seu próprio diretório de trabalho atual, e assim, se p ainda não for absoluto e tiver um componente de nome de raiz (ex: "E:filename.txt"), o diretório de trabalho atual dessa unidade é usado, o qual pode ter sido definido por um programa executado anteriormente.

### Parâmetros

p | \- | caminho a ser convertido para a forma absoluta
---|---|---
base | \- | caminho (não necessariamente absoluto) para servir como localização inicial
ec | \- | parâmetro de saída para relatório de erros na sobrecarga que não lança exceções

### Valor de retorno

Retorna um caminho absoluto (embora não necessariamente canônico) formado pela combinação de p e base conforme descrito acima.

### Exceções

A sobrecarga que não recebe um parâmetro `error_code&` lança [filesystem_error](<#/doc/experimental/fs/filesystem_error>) em erros subjacentes da API do sistema operacional, construída com p como o primeiro argumento, base como o segundo argumento, e o código de erro do sistema operacional como o argumento do código de erro. [std::bad_alloc](<#/doc/memory/new/bad_alloc>) pode ser lançada se a alocação de memória falhar. A sobrecarga que recebe um parâmetro `error_code&` o define para o código de erro da API do sistema operacional se uma chamada de API do sistema operacional falhar, e executa `ec.clear()` se nenhum erro ocorrer. Esta sobrecarga possui a especificação [`noexcept`](<#/doc/language/noexcept_spec>):

`noexcept`

### Notas

Em sistemas que suportam nomes de raiz (ex: Windows), o resultado de chamar `absolute` em um caminho relativo que possui um nome de raiz (ex: "D:file.txt" quando o nome de raiz de base é diferente) geralmente resultará em um caminho não existente.

### Exemplo

Execute este código
```cpp
    #include <filesystem>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
    
    int main()
    {
        fs::path p = "C:cl.exe";
        std::cout << "Current path is " << fs::current_path() << '\n'
                  << "Absolute path for " << p << " is " << fs::absolute(p) << '\n'
    	      << "System complete path for " << p << " is "
                  << fs::system_complete(p) << '\n';
    }
```

Saída possível:
```
    Current path is "D:/local/ConsoleApplication1"
    Absolute path for "C:cl.exe" is "C:/local/ConsoleApplication1/cl.exe"
    System complete path for "C:cl.exe" is "C:\Program Files (x86)\Microsoft Visual Studio 12.0\VC\bin\cl.exe"
```

### Veja também

[ canonical](<#/doc/experimental/fs/canonical>) | compõe um caminho canônico
(função)