# std::basic_fstream&lt;CharT,Traits&gt;::open

void open( const char* filename,  
[std::ios_base::openmode](<#/doc/io/ios_base/openmode>) mode  
= [std::ios_base::in](<#/doc/io/ios_base/openmode>) | [std::ios_base::out](<#/doc/io/ios_base/openmode>) ); |  (1)  |   
void open( const std::filesystem::path::value_type* filename,  
[std::ios_base::openmode](<#/doc/io/ios_base/openmode>) mode  
= [std::ios_base::in](<#/doc/io/ios_base/openmode>) | [std::ios_base::out](<#/doc/io/ios_base/openmode>) ); |  (2)  |  (desde C++17)  
void open( const [std::string](<#/doc/string/basic_string>)& filename,  
[std::ios_base::openmode](<#/doc/io/ios_base/openmode>) mode  
= [std::ios_base::in](<#/doc/io/ios_base/openmode>) | [std::ios_base::out](<#/doc/io/ios_base/openmode>) ); |  (3)  |  (desde C++11)  
void open( const [std::filesystem::path](<#/doc/filesystem/path>)& filename,  
[std::ios_base::openmode](<#/doc/io/ios_base/openmode>) mode  
= [std::ios_base::in](<#/doc/io/ios_base/openmode>) | [std::ios_base::out](<#/doc/io/ios_base/openmode>) ); |  (4)  |  (desde C++17)  

  
Abre e associa o arquivo com o nome filename ao stream de arquivo.

Chama clear() em caso de sucesso. Chama setstate(failbit) em caso de falha.

1,2) Efetivamente chama rdbuf()->open(filename, mode) (veja [std::basic_filebuf::open](<#/doc/io/basic_filebuf/open>) para os detalhes sobre os efeitos dessa chamada). A sobrecarga (2) é fornecida apenas se `std::filesystem::path::value_type` não for char. (desde C++17)

3,4) Efetivamente chama (1,2) como se fosse por open(filename.c_str(), mode).

### Parâmetros

filename  |  \-  |  o nome do arquivo a ser aberto   
---|---
mode  |  \-  |  especifica o modo de abertura do stream. É um [BitmaskType](<#/doc/named_req/BitmaskType>), as seguintes constantes são definidas:  |  Constante  |  Explicação   
[`app`](<#/doc/io/ios_base/openmode>) |  posiciona no final do stream antes de cada escrita   
[`binary`](<#/doc/io/ios_base/openmode>) |  abre em [modo binário](<#/doc/io/c/FILE>)  
[`in`](<#/doc/io/ios_base/openmode>) |  abre para leitura   
[`out`](<#/doc/io/ios_base/openmode>) |  abre para escrita   
[`trunc`](<#/doc/io/ios_base/openmode>) |  descarta o conteúdo do stream ao abrir   
[`ate`](<#/doc/io/ios_base/openmode>) |  posiciona no final do stream imediatamente após a abertura   
[`noreplace`](<#/doc/io/ios_base/openmode>) (C++23) |  abre em modo exclusivo   
  
### Valor de retorno

(nenhum) 

### Exemplo

Execute este código
```cpp
    #include <fstream>
    #include <iostream>
    #include <string>
     
    int main()
    {
        std::string filename = "example.123";
     
        std::fstream fs;
        fs.open(filename);
     
        if (!fs.is_open())
        {
            fs.clear();
            fs.open(filename, std::ios::out); // create file
            fs.close();
            fs.open(filename);
        }
     
        std::cout << std::boolalpha;
        std::cout << "fs.is_open() = " << fs.is_open() << '\n';
        std::cout << "fs.good() = " << fs.good() << '\n';
    }
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 22](<https://cplusplus.github.io/LWG/issue22>) | C++98  | não estava claro como o estado de erro mudava após uma abertura bem-sucedida  | o estado de erro permanece inalterado   
[LWG 409](<https://cplusplus.github.io/LWG/issue409>) | C++98  | o estado de erro permanecia inalterado após uma abertura bem-sucedida  | ele é limpo[1](<#/doc/io/basic_fstream/open>)  
[LWG 460](<https://cplusplus.github.io/LWG/issue460>) | C++98  | o argumento padrão de mode na sobrecarga (1) estava faltando (ele está presente na [sinopse](<#/doc/header/fstream>))  | adicionado   
  
  1. [↑](<#/doc/io/basic_fstream/open>) A resolução do problema LWG #22 é substituída.

### Veja também

[ is_open](<#/doc/io/basic_fstream/is_open>) |  verifica se o stream tem um arquivo associado   
(função membro pública)  
[ close](<#/doc/io/basic_fstream/close>) |  fecha o arquivo associado   
(função membro pública)  
[ open](<#/doc/io/basic_filebuf/open>) |  abre um arquivo e o configura como a sequência de caracteres associada   
(função membro pública de `std::basic_filebuf<CharT,Traits>`)