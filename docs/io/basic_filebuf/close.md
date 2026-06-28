# std::basic_filebuf&lt;CharT,Traits&gt;::close

[std::basic_filebuf](<#/doc/io/basic_filebuf>)<CharT, Traits>* close();

  
Se uma put area existir (por exemplo, o arquivo foi aberto para escrita), primeiro chama overflow(Traits::eof()) para escrever toda a saída pendente no arquivo, incluindo quaisquer sequências de unshift.

Se a função chamada mais recentemente, dentre [`underflow()`](<#/doc/io/basic_filebuf/underflow>), [`overflow()`](<#/doc/io/basic_filebuf/overflow>), [`seekpos()`](<#/doc/io/basic_filebuf/seekpos>), e [`seekoff()`](<#/doc/io/basic_filebuf/seekoff>), foi [`overflow()`](<#/doc/io/basic_filebuf/overflow>), então chama [`std::codecvt::unshift()`](<#/doc/locale/codecvt/unshift>), talvez múltiplas vezes, para determinar a sequência de unshift de acordo com o locale imbuído, e escreve essa sequência no arquivo com overflow(Traits::eof()).

Em seguida, fecha o arquivo como se chamasse [std::fclose()](<#/doc/io/c/fclose>), independentemente de qualquer uma das chamadas precedentes ter sido bem-sucedida ou falhado.

Se qualquer uma das chamadas de função feitas, incluindo a chamada para [std::fclose()](<#/doc/io/c/fclose>), falhar, retorna um ponteiro nulo. Se qualquer uma das chamadas de função lançar uma exceção, a exceção é capturada e relançada após fechar o arquivo. Se o arquivo já estiver fechado, retorna um ponteiro nulo imediatamente.

Em qualquer caso, atualiza a variável membro privada que é acessada por [is_open()](<#/doc/io/basic_filebuf/is_open>).

### Parâmetros

(nenhum)

### Valor de retorno

`this` em caso de sucesso, um ponteiro nulo em caso de falha.

### Notas

`close()` é tipicamente chamada através do destrutor de [std::basic_filebuf](<#/doc/io/basic_filebuf>) (que, por sua vez, é tipicamente chamada pelo destrutor de [std::basic_fstream](<#/doc/io/basic_fstream>).

### Exemplo

| Esta seção está incompleta  
Motivo: sem exemplo   
  
### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 443](<https://cplusplus.github.io/LWG/issue443>) | C++98  | o arquivo era escrito usando overflow([EOF](<#/doc/io/c>)) | alterado para overflow(Traits::eof())  
[LWG 622](<https://cplusplus.github.io/LWG/issue622>) | C++98  | não estava claro como lidar com a exceção lançada durante o fechamento  | ela é relançada após fechar o arquivo   
  
### Veja também

[ is_open](<#/doc/io/basic_filebuf/is_open>) | verifica se o arquivo associado está aberto   
(função membro pública)  
[ (destructor)](<#/doc/io/basic_filebuf/~basic_filebuf>)[virtual] | destrói um objeto `basic_filebuf` e fecha o arquivo se ele estiver aberto   
(função membro pública virtual)