# std::basic_fstream&lt;CharT,Traits&gt;::basic_fstream

```cpp
basic_fstream();  // (1)
explicit basic_fstream( const char* filename,
std::ios_base::openmode mode
= std::ios_base::in | std::ios_base::out );  // (2)
explicit basic_fstream( const std::filesystem::path::value_type* filename,
std::ios_base::openmode mode
= std::ios_base::in | std::ios_base::out );  // (3) (desde C++17)
explicit basic_fstream( const std::string& filename,
std::ios_base::openmode mode
= std::ios_base::in | std::ios_base::out );  // (4) (desde C++11)
template< class FsPath >
explicit basic_fstream( const FsPath& filename,
std::ios_base::openmode mode
= std::ios_base::in | std::ios_base::out );  // (5) (desde C++17)
basic_fstream( basic_fstream&& other );  // (6) (desde C++11)
basic_fstream( const basic_fstream& rhs ) = delete;  // (7) (desde C++11)
```

  
Constrói um novo stream de arquivo.

1) Construtor padrão: constrói um stream que não está associado a um arquivo: constrói por padrão o [std::basic_filebuf](<#/doc/io/basic_filebuf>) e constrói a base com o ponteiro para este membro [std::basic_filebuf](<#/doc/io/basic_filebuf>) construído por padrão.

2,3) Primeiro, executa os mesmos passos que o construtor padrão, então associa o stream a um arquivo chamando rdbuf()->open(filename, mode) (veja [std::basic_filebuf::open](<#/doc/io/basic_filebuf/open>) para os detalhes sobre os efeitos dessa chamada). Se a chamada [`open()`](<#/doc/io/basic_fstream/open>) retornar um ponteiro nulo, define setstate(failbit). A sobrecarga (3) é fornecida apenas se std::filesystem::path::value_type não for char. (desde C++17)

4,5) O mesmo que basic_fstream(filename.c_str(), mode). (5) participa da resolução de sobrecarga apenas se `FsPath` for [std::filesystem::path](<#/doc/filesystem/path>). (desde C++17)

6) Construtor de movimento. Primeiro, constrói por movimento a classe base a partir de other (o que não afeta o ponteiro [`rdbuf()`](<#/doc/io/basic_fstream/rdbuf>)), então constrói por movimento o membro [std::basic_filebuf](<#/doc/io/basic_filebuf>), então chama this->set_rdbuf() para instalar o novo `basic_filebuf` como o ponteiro [`rdbuf()`](<#/doc/io/basic_fstream/rdbuf>) na classe base.

7) O construtor de cópia é deletado: esta classe não é copiável.

### Parâmetros

filename  |  \-  |  o nome do arquivo a ser aberto   
---|---
mode  |  \-  |  especifica o modo de abertura do stream. As seguintes constantes e OR bit-a-bit entre elas podem ser usadas:  |  Constante  |  Explicação   
[`app`](<#/doc/io/ios_base/openmode>) |  posiciona no final do stream antes de cada escrita   
[`binary`](<#/doc/io/ios_base/openmode>) |  abre em [modo binário](<#/doc/io/c/FILE>)  
[`in`](<#/doc/io/ios_base/openmode>) |  abre para leitura   
[`out`](<#/doc/io/ios_base/openmode>) |  abre para escrita   
[`trunc`](<#/doc/io/ios_base/openmode>) |  descarta o conteúdo do stream ao abrir   
[`ate`](<#/doc/io/ios_base/openmode>) |  posiciona no final do stream imediatamente após a abertura   
[`noreplace`](<#/doc/io/ios_base/openmode>) (C++23) |  abre em modo exclusivo   
other  |  \-  |  outro stream de arquivo para usar como fonte   
  
### Exemplo

Execute este código
```cpp
    #include <fstream>
    #include <string>
    #include <utility>
     
    int main()
    {
        std::fstream f0;
        std::fstream f1("test.bin", std::ios::binary);
        std::string name = "example.txt";
        std::fstream f2(name);
        std::fstream f3(std::move(f1));
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 460](<https://cplusplus.github.io/LWG/issue460>) | C++98  | o argumento padrão de mode na sobrecarga (2) estava faltando (está presente na [sinopse](<#/doc/header/fstream>))  | adicionado   
[LWG 3430](<https://cplusplus.github.io/LWG/issue3430>) | C++17  | a sobrecarga de [std::filesystem::path](<#/doc/filesystem/path>) levava a conversões indesejadas  | evitado tornando-o um template   
  
### Veja também

[ open](<#/doc/io/basic_fstream/open>) |  abre um arquivo e o associa ao stream   
(função membro pública)  
[ open](<#/doc/io/basic_filebuf/open>) |  abre um arquivo e o configura como a sequência de caracteres associada   
(função membro pública de `std::basic_filebuf<CharT,Traits>`)  
[ set_rdbuf](<#/doc/io/basic_ios/set_rdbuf>) |  substitui o `rdbuf` sem limpar seu estado de erro   
(função membro protegida)  
[ (constructor)](<#/doc/io/basic_iostream/basic_iostream>) |  constrói o objeto   
(função membro pública de `std::basic_iostream<CharT,Traits>`)