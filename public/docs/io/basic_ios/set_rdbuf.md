# std::basic_ios&lt;CharT,Traits&gt;::set_rdbuf

protected:  
void set_rdbuf( [std::basic_streambuf](<#/doc/io/basic_streambuf>)<CharT,Traits>* sb ); |  |  (desde C++11)  

  
Define o stream buffer associado para `sb` sem limpar o estado de erro.

Esta função membro é protegida: ela é chamada pelos construtores de move das streams derivadas, como [std::basic_ofstream](<#/doc/io/basic_ofstream>) ou [std::basic_istringstream](<#/doc/io/basic_istringstream>), como o passo final após construir a classe base e após mover o stream buffer: apenas a classe de stream mais derivada sabe como mover corretamente o stream buffer, mas [std::basic_ios](<#/doc/io/basic_ios>) precisa ser informada da nova localização da stream para que suas funções membro públicas possam acessá-la.

### Parâmetros

sb  |  \-  |  stream buffer a ser associado   
  
### Valor de retorno

(nenhum)

### Exceções

Não lança exceções.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ rdbuf](<#/doc/io/basic_ios/rdbuf>) |  gerencia o stream buffer associado   
(função membro pública)  