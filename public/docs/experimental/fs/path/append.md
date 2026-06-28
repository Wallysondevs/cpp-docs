# std::experimental::filesystem::path::append, std::experimental::filesystem::path::operator/=

path& operator/=( const path& p ); |  (1)  |  (filesystem TS)  
template< class Source >  
path& operator/=( const Source& source ); |  (2)  |  (filesystem TS)  
template< class Source >  
path& append( const Source& source ); |  (3)  |  (filesystem TS)  
template< class InputIt >  
path& append( InputIt first, InputIt last ); |  (4)  |  (filesystem TS)  

  
1) Primeiro, anexa o separador de diretório preferencial a `*this`, exceto se qualquer uma das seguintes condições for verdadeira:

* o separador seria redundante (`*this` já termina com um separador).

* `*this` está vazio, ou adicioná-lo transformaria um caminho relativo em um caminho absoluto de alguma outra forma.

* `p` é um caminho vazio.

* `p.native()` começa com um separador de diretório.

Em seguida, anexa `p.native()` ao nome do caminho mantido por `*this`.

2,3) O mesmo que (1), mas aceita qualquer [std::basic_string](<#/doc/string/basic_string>), string multicaractere terminada em nulo, ou um iterator de entrada apontando para uma sequência multicaractere terminada em nulo.

4) O mesmo que (1), mas aceita qualquer par de iterators que designe uma string multicaractere.

### Parameters

p  |  \-  |  nome do caminho a anexar   
---|---|---
source  |  \-  |  [std::basic_string](<#/doc/string/basic_string>), string multicaractere terminada em nulo, ou um iterator de entrada apontando para uma sequência multicaractere terminada em nulo, que representa um nome de caminho (tanto em formato portátil quanto nativo)   
first, last  |  \-  |  par de [LegacyInputIterators](<#/doc/named_req/InputIterator>) que especificam uma sequência multicaractere que representa um nome de caminho   
Type requirements   
-`InputIt` deve satisfazer os requisitos de [LegacyInputIterator](<#/doc/named_req/InputIterator>).   
-O tipo de valor de `InputIt` deve ser um dos tipos de caractere codificados (char, wchar_t, char16_t e char32_t).   
  
### Return value

`*this`

### Exceptions

Pode lançar [`filesystem_error`](<#/doc/experimental/fs/filesystem_error>) em erros da API do sistema operacional subjacente ou [std::bad_alloc](<#/doc/memory/new/bad_alloc>) se a alocação de memória falhar. 

### Example

Execute este código
```
    #include <experimental/filesystem>
    #include <iostream>
    namespace fs = std::experimental::filesystem;
     
    int main()
    {
        fs::path p1 = "C:";
        p1 /= "Users"; // não insere um separador
                       // "C:Users" é um caminho relativo no Windows
                       // adicionar o separador de diretório o transformaria em um caminho absoluto
        std::cout << "\"C:\" / \"Users\" == " << p1 << '\n';
        p1 /= "batman"; // insere fs::path::preferred_separator, '\' no Windows
        std::cout << "\"C:\" / \"Users\" / \"batman\" == " << p1 << '\n';
    }
```

Saída possível: 
```
    "C:" / "Users" == "C:Users"
    "C:" / "Users" / "batman" == "C:Users\batman"
```

### See also

[ concatoperator+=](<#/doc/experimental/fs/path/concat>) |  concatena dois caminhos sem introduzir um separador de diretório   
(função membro pública)  
[ operator/](<#/doc/experimental/fs/path/operator_slash>) |  concatena dois caminhos com um separador de diretório   
(função)