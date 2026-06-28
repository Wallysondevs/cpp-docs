# std::basic_ifstream&lt;CharT,Traits&gt;::open

void open( const char* filename,  
[std::ios_base::openmode](<#/doc/io/ios_base/openmode>) mode  
= [std::ios_base::in](<#/doc/io/ios_base/openmode>) ); |  (1)  |   
void open( const std::filesystem::path::value_type* filename,  
[std::ios_base::openmode](<#/doc/io/ios_base/openmode>) mode  
= [std::ios_base::in](<#/doc/io/ios_base/openmode>) ); |  (2)  |  (desde C++17)  
void open( const [std::string](<#/doc/string/basic_string>)& filename,  
[std::ios_base::openmode](<#/doc/io/ios_base/openmode>) mode  
= [std::ios_base::in](<#/doc/io/ios_base/openmode>) ); |  (3)  |  (desde C++11)  
void open( const [std::filesystem::path](<#/doc/filesystem/path>)& filename,  
[std::ios_base::openmode](<#/doc/io/ios_base/openmode>) mode  
= [std::ios_base::in](<#/doc/io/ios_base/openmode>) ); |  (4)  |  (desde C++17)  

  
Abre e associa o arquivo com o nome `filename` ao fluxo de arquivo.

Chama `clear()` em caso de sucesso. Chama `setstate(failbit)` em caso de falha.

1,2) Efetivamente chama `rdbuf()->open(filename, mode | ios_base::in)` (veja [std::basic_filebuf::open](<#/doc/io/basic_filebuf/open>) para os detalhes sobre os efeitos dessa chamada). A sobrecarga (2) é fornecida apenas se `std::filesystem::path::value_type` não for `char`. (desde C++17)

3,4) Efetivamente chama (1,2) como se fosse `open(filename.c_str(), mode)`.

### Parâmetros

filename  |  \-  |  o nome do arquivo a ser aberto   
---|---
mode  |  \-  |  especifica o modo de abertura do fluxo. É um [BitmaskType](<#/doc/named_req/BitmaskType>), as seguintes constantes são definidas:  |  Constante  |  Explicação   
[`app`](<#/doc/io/ios_base/openmode>) |  busca o fim do fluxo antes de cada escrita   
[`binary`](<#/doc/io/ios_base/openmode>) |  abre em [modo binário](<#/doc/io/c/FILE>)  
[`in`](<#/doc/io/ios_base/openmode>) |  abre para leitura   
[`out`](<#/doc/io/ios_base/openmode>) |  abre para escrita   
[`trunc`](<#/doc/io/ios_base/openmode>) |  descarta o conteúdo do fluxo ao abrir   
[`ate`](<#/doc/io/ios_base/openmode>) |  busca o fim do fluxo imediatamente após a abertura   
[`noreplace`](<#/doc/io/ios_base/openmode>) (C++23) |  abre em modo exclusivo   
  
### Valor de retorno

(nenhum) 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 22](<https://cplusplus.github.io/LWG/issue22>) | C++98  | não estava claro como o estado de erro muda após uma abertura bem-sucedida  | o estado de erro permanece inalterado   
[LWG 409](<https://cplusplus.github.io/LWG/issue409>) | C++98  | o estado de erro permanecia inalterado após uma abertura bem-sucedida  | ele é limpo[1](<#/doc/io/basic_ifstream/open>)  
  
  1. [↑](<#/doc/io/basic_ifstream/open>) A resolução do problema LWG #22 é sobrescrita.

### Veja também

[ is_open](<#/doc/io/basic_ifstream/is_open>) |  verifica se o fluxo tem um arquivo associado   
(função membro pública)  
[ close](<#/doc/io/basic_ifstream/close>) |  fecha o arquivo associado   
(função membro pública)  
[ open](<#/doc/io/basic_filebuf/open>) |  abre um arquivo e o configura como a sequência de caracteres associada   
(função membro pública de `std::basic_filebuf<CharT,Traits>`)